import type { ReactNode } from 'react';
import { Link, type To } from 'react-router';
import './ui.css';

type ActionLinkProps = {
  to: To;
  children: ReactNode;
  className?: string;
};

export default function ActionLink({
  to,
  children,
  className,
}: ActionLinkProps) {
  const classes = ['ui-action-link', className].filter(Boolean).join(' ');

  return (
    <Link to={to} className={classes}>
      <span>{children}</span>
      <span className="ui-action-link__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
