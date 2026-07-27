import React, { useState, useRef, useEffect } from 'react';

import { useUserTheme } from '@/features/user-config/theme/ThemeColorProviderContext.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

export function ThemeColorPicker() {
  const { themeColor, setThemeColor } = useUserTheme();
  const currentThemeColor = hexToHsl(themeColor);

  const [hue, setHue] = useState(currentThemeColor.h);
  const [saturation, setSaturation] = useState(currentThemeColor.s);
  const [lightness, setLightness] = useState(currentThemeColor.l);

  const hueRef = useRef<HTMLDivElement>(null);
  const satRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const draggingTarget = useRef<'hue' | 'sat' | 'light' | null>(null);

  const currentHex = hslToHex(hue, saturation, lightness);
  const baseColorAtMax = `hsl(${hue}, 100%, 50%)`;

  const updateSliderValue = (clientX: number, container: HTMLDivElement | null, type: 'hue' | 'sat' | 'light') => {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));

    if (type === 'hue') setHue(Math.round(ratio * 360));
    if (type === 'sat') setSaturation(Math.round(ratio * 100));
    if (type === 'light') setLightness(Math.round(ratio * 100));
  };

  const handleMouseDown = (e: React.MouseEvent, type: 'hue' | 'sat' | 'light') => {
    draggingTarget.current = type;
    const currentContainer = type === 'hue' ? hueRef.current : type === 'sat' ? satRef.current : lightRef.current;
    updateSliderValue(e.clientX, currentContainer, type);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = draggingTarget.current;
      if (!target) return;
      const currentContainer = target === 'hue' ? hueRef.current : target === 'sat' ? satRef.current : lightRef.current;
      updateSliderValue(e.clientX, currentContainer, target);
    };
    const handleMouseUp = () => {
      draggingTarget.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (currentHex && currentHex !== themeColor) {
      setThemeColor(currentHex);
    }
  }, [currentHex, themeColor, setThemeColor]);

  const outerDivCss = 'border-border h-4 w-full cursor-pointer rounded-full border shadow-inner';
  const innerDivCss =
    'border-white absolute top-1/2 h-4 w-4 cursor-grab rounded-full border-3 bg-transparent shadow-md transition-transform active:scale-110 active:cursor-grabbing';

  return (
    <div className='border-border bg-sub-background text-sub-foreground w-full border-t py-3 pr-3 pl-11 font-light transition-colors'>
      <div className='-mb-1'>
        <span className='text-xs tracking-wider'>하이라이트 색</span>
      </div>

      <div className='flex flex-col gap-1 py-2 text-[11px]'>
        <div className='flex flex-row items-center gap-1.5'>
          <span>색상</span>
          <div className='relative flex-1 py-1'>
            <div
              ref={hueRef}
              onMouseDown={(e) => handleMouseDown(e, 'hue')}
              className={cn(outerDivCss)}
              style={{ backgroundImage: 'linear-gradient(to right, red, #ff0, #0f0, #0ff, #3131ff, #f0f, red)' }}>
              <div
                className={cn(innerDivCss)}
                style={{ left: `${(hue / 360) * 100}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
          </div>
        </div>

        <div className='flex flex-row items-center gap-1.5'>
          <span>채도</span>
          <div className='relative flex-1 py-1'>
            <div
              ref={satRef}
              onMouseDown={(e) => handleMouseDown(e, 'sat')}
              className={cn(outerDivCss)}
              style={{ backgroundImage: `linear-gradient(to right, #808080, ${baseColorAtMax})` }}>
              <div className={cn(innerDivCss)} style={{ left: `${saturation}%`, transform: 'translate(-50%, -50%)' }} />
            </div>
          </div>
        </div>

        <div className='flex flex-row items-center gap-1.5'>
          <span>명도</span>
          <div className='relative flex-1 py-1'>
            <div
              ref={lightRef}
              onMouseDown={(e) => handleMouseDown(e, 'light')}
              className={cn(outerDivCss)}
              style={{ backgroundImage: `linear-gradient(to right, #000000, ${baseColorAtMax}, #ffffff)` }}>
              <div className={cn(innerDivCss)} style={{ left: `${lightness}%`, transform: 'translate(-50%, -50%)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// HEX to HSL 변환 함수
const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// HSL to HEX 변환 함수
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
