import './Button.css';

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default',
  icon,
  className = '',
  ...props 
}) {
  const classes = [
    'neu-button',
    variant !== 'default' && `neu-button--${variant}`,
    size === 'icon' && 'neu-button--icon',
    size === 'icon-sm' && 'neu-button--icon-sm',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {icon && <span className="neu-button__icon">{icon}</span>}
      {children}
    </button>
  );
}
