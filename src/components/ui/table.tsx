import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: TableProps) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>
);

export const TableHeader = ({ children, className = '' }: TableProps) => (
  <thead className={`bg-gray-50 ${className}`}>{children}</thead>
);

export const TableBody = ({ children, className = '' }: TableProps) => (
  <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>
);

export const TableRow = ({ children, className = '' }: TableProps) => (
  <tr className={className}>{children}</tr>
);

export const TableHead = ({ children, className = '' }: TableProps) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({ children, className = '' }: TableProps) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`}>
    {children}
  </td>
);
