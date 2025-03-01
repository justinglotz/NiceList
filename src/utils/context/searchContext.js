import { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext('');

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  const value = useMemo(() => ({ searchQuery, setSearchQuery }), [searchQuery]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  return context;
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
