import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CustomProgressBar({ value, max = 100, className = '' }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Calculate percentage and set width
    setWidth((value / max) * 100);
  }, [value, max]);

  return (
    <div className={`relative w-full h-[23px] bg-gray-300 rounded-full overflow-hidden ${className}`}>
      {/* Progress Bar */}
      <div className="h-full bg-[#4CAF50] rounded-full transition-all duration-500 ease-out" style={{ width: `${width}%` }} />

      {/* Progress Text */}
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">{Math.round(width)}%</span>
    </div>
  );
}

export default CustomProgressBar;

CustomProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
};
