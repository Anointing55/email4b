import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: CardProps) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: CardProps) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }: CardProps) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: CardProps) => (
  <div className={`mt-4 ${className}`}>{children}</div>
);
