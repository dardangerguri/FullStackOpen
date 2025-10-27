import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import Text from '../ui/Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item} />}
    />
  );
};

export default RepositoryList;
