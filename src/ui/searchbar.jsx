import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './searchbar.css';

const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  debounceTime = 300,
  variant = 'default', // 'default' or 'minimal'
  icon = null,
  showClearButton = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (onSearch) {
      const timer = setTimeout(() => {
        onSearch(value);
      }, debounceTime);
      setDebounceTimer(timer);
    }
  };



  return (
    <div className={`searchbar-container ${variant}`}>
      <div className="searchbar-inner">
        {icon && <div className="searchbar-icon">{icon}</div>}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="searchbar-input"
        />
        
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  debounceTime: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'minimal']),
  icon: PropTypes.node,
  showClearButton: PropTypes.bool,
};

export default SearchBar;