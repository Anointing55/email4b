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

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-semibold text-gray-900">{children}</h3>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4">{children}</div>
);
