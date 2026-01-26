import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200';

  const variantStyles = {
    primary:
      'py-2.5 text-white bg-accent hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    secondary:
      'py-2.5 text-accent bg-transparent border border-accent hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed',
    link: 'bg-transparent text-accent underline text-xs p-0',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
