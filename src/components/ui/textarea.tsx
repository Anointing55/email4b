import React from 'react';

export const Textarea = ({ 
  className = '', 
  ...props 
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 ${className}`}
      {...props}
    />
  );
};
