import { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const BudgetContext = createContext('');

export function BudgetProvider({ children }) {
  const [budgetAmount, setBudgetAmount] = useState('');

  const value = useMemo(() => ({ budgetAmount, setBudgetAmount }), [budgetAmount]);

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
}

export const useBudget = () => {
  const context = useContext(BudgetContext);
  return context;
};

BudgetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
