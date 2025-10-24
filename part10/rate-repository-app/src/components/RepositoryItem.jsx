import { View, StyleSheet } from 'react-native';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryStats from './RepositoryStats';

const styles = StyleSheet.create({
  RepositoryItem: {
    backgroundColor: 'white',
  },
});

const RepositoryItem = ({ repo }) => {
  return (
    <View style={styles.RepositoryItem}>
      <RepositoryItemHeader repo={repo} />
      <RepositoryStats repo={repo} />
    </View>
  );
};

export default RepositoryItem;
