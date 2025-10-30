import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useUserReviews from '../../hooks/useUserReviews';
import Text from '../ui/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  reviewItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mainBackground,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  repositoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const ReviewItem = ({ review, onRepositoryPress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.content}>
        <Pressable onPress={() => onRepositoryPress(review.repository.id)}>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
        </Pressable>
        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { reviews, loading, error } = useUserReviews();
  const navigate = useNavigate();

  const handleRepositoryPress = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading reviews: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} onRepositoryPress={handleRepositoryPress} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>No reviews yet.</Text>
          </View>
        }
      />
    </View>
  );
};

export default UserReviews;
