import { View, StyleSheet, Pressable } from 'react-native';
import Text from '../../ui/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mainBackground,
  },
  reviewItem: {
    flexDirection: 'row',
    padding: 15,
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
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 2,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ReviewItem = ({ review, onViewRepository, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewItem}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={() => onViewRepository(review.repository.id)}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(review.id)}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewItem;
