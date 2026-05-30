import React from 'react';

import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';

// Next.js의 href 타입과 호환되도록 커스텀
interface CustomLinkProps extends Omit<RouterLinkProps, 'to'> {
  href: string; // Next.js처럼 href 사용
}

export const Link: React.FC<CustomLinkProps> = ({ href, children, className, ...props }) => {
  return (
    <RouterLink to={href} className={`text-blue-500 hover:underline ${className || ''}`} {...props}>
      {children}
    </RouterLink>
  );
};
