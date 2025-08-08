import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input 
      className={`border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 ${className}`}
      {...props}
    />
  );
};
