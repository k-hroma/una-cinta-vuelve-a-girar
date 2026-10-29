import '../styles/common/loading-spinner.css';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LoadingSpinner({
  fullScreen = true,
  text = 'Cargando',
  size = 'medium',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`loading-container ${fullScreen ? 'loading-container--fullscreen' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={text || 'Cargando'}
    >
      <div className={`loading-spinner loading-spinner--${size}`}>
        <div className="loading-spinner__orbit" aria-hidden="true">
          <div className="loading-spinner__dot" />
        </div>
        {text && <span className="loading-spinner__text">{text}</span>}
      </div>
    </div>
  );
}
