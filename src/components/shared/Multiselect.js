import React, {useState} from 'react'

// Reusable Dropdown Component with Multi-select Support
const Multiselect = ({ placeholder, options, value, onChange, className = '', multiSelect = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      onChange(newValues);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const isSelected = (option) => {
    if (multiSelect) {
      return Array.isArray(value) && value.includes(option);
    }
    return value === option;
  };

  const getDisplayText = () => {
    if (multiSelect) {
      if (!value || value.length === 0) return placeholder;
      if (value.length === 1) return value[0];
      return `${value.length} selected`;
    }
    return value || placeholder;
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange(multiSelect ? [] : '');
  };

  const hasSelection = multiSelect ? (value && value.length > 0) : value;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <span className={`${hasSelection ? 'text-gray-700' : 'text-gray-500'}`}>
          {getDisplayText()}
        </span>
        <div className="flex items-center gap-2">
          {hasSelection && (
            <button
              onClick={clearSelection}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
          {/* <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} /> */}
        </div>
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {multiSelect && (
              <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-xs text-gray-600 font-medium">
                Select multiple options
              </div>
            )}
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 ${
                  isSelected(option) ? 'bg-blue-50' : ''
                }`}
              >
                {multiSelect && (
                  <input
                    type="checkbox"
                    checked={isSelected(option)}
                    onChange={() => {}}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                )}
                <span className={`flex-1 ${isSelected(option) ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Multiselect