import { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const hideCompletedContext = createContext('');

export function HideCompletedProvider({ children }) {
  const [hideCompleted, setHideCompleted] = useState('');

  const value = useMemo(() => ({ hideCompleted, setHideCompleted }), [hideCompleted]);

  return <hideCompletedContext.Provider value={value}>{children}</hideCompletedContext.Provider>;
}

export const useHideCompleted = () => {
  const context = useContext(hideCompletedContext);
  return context;
};

HideCompletedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
