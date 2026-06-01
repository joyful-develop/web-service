import clsx from 'clsx';

import { icons } from '#components/icons/lucide-icon-registry.ts';

import type { IconProps } from '#components/icons/lucide-icon.d.ts';

export function LucideIcon({ name, size = 24, strokeWidth = 2, label, className, ...rest }: IconProps) {
  const Icon = icons[name];
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      color='currentColor'
      className={clsx('text-gray-900', className)}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    />
  );
}
