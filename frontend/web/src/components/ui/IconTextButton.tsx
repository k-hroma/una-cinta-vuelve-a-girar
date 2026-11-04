import type {
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react';
import './ui.css';

type IconTextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  iconSrc: string;
  iconClassName?: string;
  ref?: Ref<HTMLButtonElement>;
};

export default function IconTextButton({
  children,
  iconSrc,
  iconClassName = 'play-icon',
  className,
  ref,
  ...buttonProps
}: IconTextButtonProps) {
  const classes = ['ui-icon-text-button', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...buttonProps} ref={ref} className={classes}>
      <span>{children}</span>
      <img src={iconSrc} alt="" aria-hidden="true" className={iconClassName} />
    </button>
  );
}
