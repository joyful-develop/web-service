import React from 'react';

export function createDynamicComponent(type: string, path: string) {
  return async () => {
    // 테스트용 가상 컴포넌트 객체 반환 (React Router lazy 스펙)
    return {
      Component: () => React.createElement('div', null, `Mocked Page: ${path}`),
    };
  };
}
