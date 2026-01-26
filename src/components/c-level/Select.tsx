import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: { target: { name: string; value: string } }) => void;
  onBlur?: (e: { target: { name: string } }) => void;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  placeholder,
  value,
  name = '',
  onChange,
  onBlur,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.({ target: { name } });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [name, onBlur]);

  const handleSelect = (optionValue: string) => {
    onChange?.({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      {label && (
        <label className="text-xs font-medium text-secondary ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`w-full py-2.5 pl-3 pr-10 text-sm border border-border rounded-lg outline-none transition-all duration-200 bg-white text-left cursor-pointer focus:border-accent focus:shadow-[0_0_0_2px_rgba(16,185,129,0.1)] disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedOption ? 'text-text' : 'text-text-light'
          } ${error ? 'border-red-500' : ''} ${className}`}
        >
          {selectedOption?.label || placeholder || 'Select...'}
        </button>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-lg shadow-lg overflow-hidden">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-3 py-2.5 text-sm cursor-pointer transition-colors duration-150 ${
                  option.value === value
                    ? 'bg-accent/10 text-accent'
                    : 'text-text hover:bg-gray-50'
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
};

export default Select;
