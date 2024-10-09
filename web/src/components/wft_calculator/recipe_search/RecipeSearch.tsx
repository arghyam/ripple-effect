import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

interface RecipeSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 100%;
`;

const SearchBox = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: relative;
  height: 50px;
  width: 100%;
  max-width: 500px;
  transition: width 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    width: 80%;
    max-width: 80%;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  align-self: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  border-radius: 20px;
  height: 100%;
  align-self: center;
`;

const ClearIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #ccc;
  align-self: center;
`;

const RecipeSearch: React.FC<RecipeSearchProps> = ({ searchQuery, setSearchQuery, clearSearch }) => {
  return (
    <Container>
      <SearchBox isMobile={window.innerWidth <= 768}>
        <Icon icon={faSearch} />
        <Input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        {searchQuery && <ClearIcon icon={faTimes} onClick={clearSearch} />}
      </SearchBox>
    </Container>
  );
};

export default RecipeSearch;
