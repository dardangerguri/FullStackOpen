import { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import theme from '../../../theme';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import useRepositories from '../../../hooks/useRepositories';
import Text from '../../ui/Text';
import SortPicker from './SortPicker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sortOption, setSortOption] = useState('latest');
  const navigate = useNavigate();

  const getSortVariables = (option) => {
    switch (option) {
      case 'latest':
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      case 'highestRated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowestRated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { orderBy, orderDirection } = getSortVariables(sortOption);
  const { repositories, loading, error } = useRepositories(orderBy, orderDirection);

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const ListHeader = () => (
    <SortPicker sortOption={sortOption} onSortChange={handleSortChange} />
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem
          repo={item}
          onPress={() => handleRepositoryPress(item.id)}
        />
      )}
      ListHeaderComponent={ListHeader}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
