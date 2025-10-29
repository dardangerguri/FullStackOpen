import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../../hooks/useRepository';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem/ReviewItem';
import Text from '../../ui/Text';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const reviews = repository?.reviews?.edges
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <View style={{ backgroundColor: 'white', padding: 15 }}>
            <Text>No reviews yet</Text>
          </View>
        }
      />
    </View>
  );
};

export default SingleRepository;
