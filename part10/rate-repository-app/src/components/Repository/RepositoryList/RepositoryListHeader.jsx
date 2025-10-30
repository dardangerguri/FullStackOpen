import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDebounce } from 'use-debounce';
import SearchBar from './SearchBar';
import SortPicker from './SortPicker';

const RepositoryListHeader = ({ sortOption, onSortChange, onSearch }) => {
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 500);

  useEffect(() => {
    onSearch(debouncedInput);
  }, [debouncedInput]);

  return (
    <View>
      <SearchBar searchQuery={input} onSearchChange={setInput} />
      <SortPicker sortOption={sortOption} onSortChange={onSortChange} />
    </View>
  );
};

export default React.memo(RepositoryListHeader);
