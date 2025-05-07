import React from 'react';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  loadingText?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  fullWidth?: boolean;
  rounded?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  label,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
  loading = false,
  loadingText,
  variant = 'solid',
  color = primary ? 'primary' : 'default',
  fullWidth = false,
  rounded = false,
  ...props
}: ButtonProps) => {
  const baseClass = 'button';
  const sizeClass = `${baseClass}--${size}`;
  const variantClass = `${baseClass}--${variant}`;
  const colorClass = `${baseClass}--${color}`;
  const fullWidthClass = fullWidth ? `${baseClass}--full-width` : '';
  const roundedClass = rounded ? `${baseClass}--rounded` : '';
  const iconOnlyClass = !label && icon ? `${baseClass}--icon-only` : '';
  
  const buttonClasses = [
    baseClass,
    sizeClass,
    variantClass,
    colorClass,
    fullWidthClass,
    roundedClass,
    iconOnlyClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="button__spinner"></span>
          {loadingText || label}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="button__icon button__icon--left">{icon}</span>
          )}
          {label && <span className="button__label">{label}</span>}
          {icon && iconPosition === 'right' && (
            <span className="button__icon button__icon--right">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;

// Usage examples
export const ButtonExamples = () => {
  return (
    <div className="button-examples">
      <div className="button-row">
        <Button label="Default Button" />
        <Button primary label="Primary Button" />
        <Button label="Disabled Button" disabled />
      </div>
      
      <div className="button-row">
        <Button size="small" label="Small Button" />
        <Button size="medium" label="Medium Button" />
        <Button size="large" label="Large Button" />
      </div>
      
      <div className="button-row">
        <Button variant="solid" label="Solid Button" />
        <Button variant="outline" label="Outline Button" />
        <Button variant="ghost" label="Ghost Button" />
      </div>
      
      <div className="button-row">
        <Button color="primary" label="Primary" />
        <Button color="secondary" label="Secondary" />
        <Button color="danger" label="Danger" />
        <Button color="success" label="Success" />
        <Button color="warning" label="Warning" />
        <Button color="info" label="Info" />
      </div>
      
      <div className="button-row">
        <Button 
          label="With Icon" 
          icon={<span>🔍</span>} 
          iconPosition="left" 
        />
        <Button 
          label="Loading" 
          loading 
          loadingText="Loading..." 
        />
        <Button 
          label="Full Width" 
          fullWidth 
        />
        <Button 
          label="Rounded" 
          rounded 
        />
      </div>
    </div>
  );
};