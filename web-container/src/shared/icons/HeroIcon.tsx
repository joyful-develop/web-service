import clsx from 'clsx';

import { icons } from '@/shared/icons/hero-icon-registry.ts';
import type { IconProps } from '@/shared/icons/hero-icon.d.ts';

export function HeroIcon({ name, label, className, ...rest }: IconProps) {
  const Icon = icons[name];
  return (
    <Icon
      className={clsx('text-gray-900', className)}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    />
  );
}
