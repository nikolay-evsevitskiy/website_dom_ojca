import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface CopyButtonProps {
  onCopy: () => void;
  copied: boolean;
  className?: string;
}

/**
 * Reusable CopyButton component
 * Follows SRP - single responsibility for copy button UI
 */
export const CopyButton: React.FC<CopyButtonProps> = ({ 
  onCopy, 
  copied, 
  className = '' 
}) => {
  return (
    <button
      onClick={onCopy}
      className={`p-3 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors ${className}`}
      title={copied ? 'Skopiowano' : 'Kopiuj'}
      aria-label={copied ? 'Skopiowano' : 'Kopiuj'}
    >
      {copied ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
    </button>
  );
};
