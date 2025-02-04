import type React from 'react';
import { InputProps } from '../propTypes';
import { cn } from '../../../utils';

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-400">
          {label}
        </label>
      )}
      <input
        className={cn(
          'rounded-xl border px-3 py-2',
          'focus:outline-none',
          className
        )}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
};

export default Input;
