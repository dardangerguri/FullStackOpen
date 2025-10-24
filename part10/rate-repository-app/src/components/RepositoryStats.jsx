import { View, StyleSheet } from 'react-native';
import RepositoryStatItem from './RepositoryStatItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
});

const RepositoryStats = ({ repo }) => {
  return (
    <View style={styles.container}>
      <RepositoryStatItem label="Stars" value={repo.stargazersCount} />
      <RepositoryStatItem label="Forks" value={repo.forksCount} />
      <RepositoryStatItem label="Reviews" value={repo.reviewCount} />
      <RepositoryStatItem label="Rating" value={repo.ratingAverage} />
    </View>
  );
};

export default RepositoryStats;
