import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button = ({
  variant = 'default',
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'px-4 py-2 rounded-lg font-medium transition-colors';

  let variantClasses = '';
  if (variant === 'outline') {
    variantClasses = 'border border-indigo-500 text-indigo-600 hover:bg-indigo-50';
  } else if (variant === 'ghost') {
    variantClasses = 'bg-transparent text-gray-600 hover:bg-indigo-50 hover:text-indigo-700';
  } else {
    variantClasses = 'bg-indigo-600 text-white hover:bg-indigo-700';
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    />
  );
};
