import React, {  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const RecipeSearch = ({ searchQuery, setSearchQuery, clearSearch }) => {


  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <FontAwesomeIcon icon={faSearch} style={styles.icon} />
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        {searchQuery && (
          <FontAwesomeIcon
            icon={faTimes}
            style={styles.clearIcon}
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
    width: '100%',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '25px',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'relative',
    height: '50px',
    width: '100%',
    maxWidth: '500px',
    transition: 'width 0.3s ease-in-out',
  },
  icon: {
    marginRight: '10px',
    alignSelf: 'center',
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: 16,
    width: '100%',
    borderRadius: '20px',
    height: '100%',
    alignSelf: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    color: '#ccc',
    alignSelf: 'center',
  },
  '@media (max-width: 768px)': {
    searchBox: {
      width: '90%',
      maxWidth: '100%',
    },
  },
  '@media (max-width: 480px)': {
    searchBox: {
      width: '80%',
      maxWidth: '80%'
    }
  }
}

export default RecipeSearch;



