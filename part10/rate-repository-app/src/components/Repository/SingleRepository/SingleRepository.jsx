import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
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
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error, fetchMore } = useRepository(id, 5);

  const isFetchingMore = React.useRef(false);

  const reviews = React.useMemo(
    () => repository?.reviews?.edges?.map(edge => edge.node) || [],
    [repository?.reviews?.edges]
  );

  const headerComponent = React.useMemo(
    () => <RepositoryInfo repository={repository} />,
    [repository]
  );

  const handleFetchMore = React.useCallback(async () => {
    if (isFetchingMore.current || !repository?.reviews?.pageInfo?.hasNextPage) return;

    isFetchingMore.current = true;
    try {
      await fetchMore();
    } catch (err) {
      console.log('Error fetching more reviews:', err);
    } finally {
      isFetchingMore.current = false;
    }
  }, [repository?.reviews?.pageInfo?.hasNextPage, fetchMore]);

  const renderFooter = () => {
    if (!isFetchingMore.current) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
        <Text style={{ marginTop: 8 }}>Loading more reviews...</Text>
      </View>
    );
  };

  if (loading && !repository) {
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

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={headerComponent}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <View style={{ backgroundColor: 'white', padding: 20, alignItems: 'center' }}>
            <Text>No reviews yet</Text>
          </View>
        }
        onEndReached={handleFetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default React.memo(SingleRepository);
