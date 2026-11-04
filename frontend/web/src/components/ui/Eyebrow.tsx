import type { ReactNode } from 'react';
import './ui.css';

type EyebrowProps = {
  children: ReactNode;
  variant?: 'accent' | 'inverse';
  className?: string;
};

export default function Eyebrow({
  children,
  variant = 'accent',
  className,
}: EyebrowProps) {
  const classes = [
    'ui-eyebrow',
    `ui-eyebrow--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}
