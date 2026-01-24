import React from 'react';
import { CopyButton } from './CopyButton';
import { useClipboard } from '../../hooks/useClipboard';

interface BankAccountFieldProps {
  label: string;
  value: string;
  isMonospace?: boolean;
}

/**
 * Reusable BankAccountField component
 * Follows SRP - single responsibility for bank account field display
 */
export const BankAccountField: React.FC<BankAccountFieldProps> = ({
  label,
  value,
  isMonospace = false,
}) => {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          readOnly
          value={value}
          className={`flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white ${
            isMonospace ? 'font-mono text-lg' : ''
          }`}
        />
        <CopyButton
          onCopy={() => copyToClipboard(value)}
          copied={copied}
        />
      </div>
    </div>
  );
};
