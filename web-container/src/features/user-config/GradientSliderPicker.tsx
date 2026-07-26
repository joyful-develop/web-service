import React, { useState, useRef, useEffect } from 'react';

interface GradientSliderPickerProps {
  onChange?: (color: string) => void;
}

export function GradientSliderPicker({ onChange }: GradientSliderPickerProps) {
  const [hue, setHue] = useState(0); // 0 ~ 360도 값 관리
  const [selectedColor, setSelectedColor] = useState('rgb(255, 0, 0)');
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // 무지개 선형 그라디언트 문자열 정의
  const gradientStyle = 'linear-gradient(to right, red, #ff0, #0f0, #0ff, #3131ff, #f0f, red)';

  // 마우스/터치 위치에 따라 HSL 색상을 계산하는 함수
  const updateColor = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    // 슬라이더 바 내부에서의 상대적 X 위치 비율 계산 (0 ~ 1)
    let percentage = (clientX - rect.left) / rect.width;
    percentage = Math.max(0, Math.min(1, percentage)); // 0과 1 사이로 클램핑

    // 그라디언트 전체 범위를 360도로 변환 (HSL의 Hue)
    const currentHue = Math.round(percentage * 360);
    setHue(currentHue);

    // HSL 값을 바탕으로 RGB 문자열 생성 (투명도 없이 진한 색을 위해 채도 100%, 명도 50% 고정)
    const rgbColor = `hsl(${currentHue}, 100%, 50%)`;
    setSelectedColor(rgbColor);

    if (onChange) onChange(rgbColor);
  };

  // 마우스 다운 및 드래그 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateColor(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updateColor(e.clientX);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // 전역 이벤트를 등록하여 슬라이더 바 영역을 벗어나도 드래그가 유지되도록 처리
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className='w-80 rounded-xl border border-zinc-200 bg-white p-5 shadow-md dark:border-zinc-800 dark:bg-[#121214]'
      role='region'
      aria-label='Spectrum Color Slider'>
      {/* 1. 상단 결과 창: 선택된 불투명하고 진한 컬러 프리뷰 */}
      <div className='mb-5 flex items-center gap-3'>
        <div
          className='h-12 w-12 rounded-lg border border-black/10 shadow-inner transition-colors duration-700'
          style={{ backgroundColor: selectedColor }}
        />
        <div>
          <div className='text-[10px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500'>
            Selected Color
          </div>
          <div className='font-mono text-sm font-semibold text-zinc-800 uppercase dark:text-zinc-200'>
            {/* HSL 혹은 간단하게 변환된 값 표기 가능 */}
            HSL({hue}°, 100%, 50%)
          </div>
        </div>
      </div>

      {/* 2. 하단 슬라이더: 요청하신 무지개 그라디언트 적용 바 */}
      <div className='relative py-2'>
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          className='h-4 w-full cursor-pointer rounded-full shadow-inner'
          style={{ backgroundImage: gradientStyle }}>
          {/* 손잡이(Thumb) 핀 애니메이션 및 위치 계산 */}
          <div
            className='absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white bg-zinc-900 shadow-md transition-all active:scale-110'
            style={{
              left: `calc(${(hue / 360) * 100}% - 12px)`,
              backgroundColor: selectedColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
