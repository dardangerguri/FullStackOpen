import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../../hooks/useRepositories';
import RepositoryListHeader from './RepositoryListHeader';
import { RepositoryListContainer } from './RepositoryListContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RepositoryList = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { orderBy, orderDirection } = (() => {
    switch (sortOption) {
      case 'latest': return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      case 'highestRated': return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowestRated': return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      default: return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  })();

  const { repositories, loading, error } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearchQuery
  );

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <View style={styles.container}>
      <RepositoryListHeader
        sortOption={sortOption}
        onSortChange={setSortOption}
        onSearch={setSearchQuery}
      />
      <RepositoryListContainer
        repositories={repositories}
        loading={loading}
        error={error}
        onRepositoryPress={handleRepositoryPress}
      />
    </View>
  );
};

export default RepositoryList;
