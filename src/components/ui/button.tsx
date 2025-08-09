import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'rounded-lg font-medium transition-colors';

  const variantClasses =
    variant === 'outline'
      ? 'border border-indigo-500 text-indigo-600 hover:bg-indigo-50'
      : variant === 'ghost'
      ? 'bg-transparent text-gray-600 hover:bg-gray-100'
      : 'bg-indigo-600 text-white hover:bg-indigo-700';

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-1 text-sm'
      : size === 'lg'
      ? 'px-6 py-3 text-lg'
      : 'px-4 py-2 text-base';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    />
  );
};
