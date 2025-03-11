import React from 'react';
import PropTypes from 'prop-types';

function BudgetProgressBar({ initialBudget, currentBudget }) {
  // Calculate percentage used
  const percentageUsed = Math.min(100, Math.max(0, ((initialBudget - currentBudget) / initialBudget) * 100));
  const percentageRemaining = 100 - percentageUsed;

  // Determine color based on usage
  const getBarColor = () => {
    if (percentageRemaining > 75) return 'bg-green-500'; // 75-100% remaining
    if (percentageRemaining > 50) return 'bg-yellow-500'; // 50-75% remaining
    if (percentageRemaining > 25) return 'bg-orange-500'; // 25-50% remaining
    return 'bg-red-500'; // 0-25% remaining
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">
          ${currentBudget} of ${initialBudget} remaining
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className={`h-4 rounded-full ${getBarColor()} transition-all duration-500`} style={{ width: `${percentageRemaining}%` }} />
      </div>
    </div>
  );
}

BudgetProgressBar.propTypes = {
  initialBudget: PropTypes.number.isRequired,
  currentBudget: PropTypes.number.isRequired,
};

export default BudgetProgressBar;
