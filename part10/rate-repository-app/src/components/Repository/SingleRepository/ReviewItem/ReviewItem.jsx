import { View, StyleSheet } from 'react-native';
import Text from '../../../ui/Text';
import theme from '../../../../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  text: {
    lineHeight: 20,
  },
});

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        </View>
      </View>
      <Text style={styles.text}>{review.text}</Text>
    </View>
  );
};

export default ReviewItem;
