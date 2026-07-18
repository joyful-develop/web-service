import React, { useState, useEffect } from 'react';

// Tailwind 기본 색상표 헥사코드 정의
const TAILWIND_COLORS = [
  { name: 'Slate', hex: '#64748b' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Sky', hex: '#0ea5e9' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Rose', hex: '#f43f5e' },
];

export default function ThemePicker() {
  // 초기 기본값은 Blue(#3b82f6)로 설정
  const [selectedColor, setSelectedColor] = useState('#3b82f6');

  // 색상이 변경될 때마다 root 엘리먼트의 CSS 변수를 업데이트
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', selectedColor);
  }, [selectedColor]);

  return (
    <div className='mx-auto max-w-md space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-md'>
      <div>
        <h2 className='text-xl font-bold text-gray-800'>테마 색상 설정</h2>
        <p className='mt-1 text-sm text-gray-500'>원하는 브랜드 색상을 선택하세요.</p>
      </div>

      {/* 색상 선택 그리드 */}
      <div className='grid grid-cols-4 gap-3'>
        {TAILWIND_COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.hex)}
            className={`flex h-10 transform items-center justify-center rounded-lg text-xs font-semibold text-white transition-all hover:scale-105 ${
              selectedColor === color.hex
                ? 'scale-105 ring-4 ring-gray-400 ring-offset-2'
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
            aria-label={`${color.name} 테마 선택`}>
            {selectedColor === color.hex && '✓'}
          </button>
        ))}
      </div>

      {/* 실시간 반영 예시 UI */}
      <div className='space-y-3 border-t border-gray-100 pt-4'>
        <span className='text-xs font-bold tracking-wider text-gray-400 uppercase'>미리보기</span>

        {/* bg-primary 적용 */}
        <button className='bg-primary w-full rounded-lg px-4 py-2 font-medium text-white shadow transition-opacity hover:opacity-90'>
          기본 버튼 (bg-primary)
        </button>

        {/* text-primary 적용 */}
        <p className='text-primary text-center text-sm font-semibold'>강조 텍스트 컬러 (text-primary)</p>

        {/* border-primary 적용 */}
        <div className='border-primary rounded-lg border-2 bg-gray-50 p-3 text-center text-xs text-gray-600'>
          테두리 강조 박스 (border-primary)
        </div>
      </div>
    </div>
  );
}
