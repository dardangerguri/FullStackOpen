import { View, StyleSheet } from 'react-native';
import RepositoryAvatar from './RepositoryAvatar';
import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const RepositoryItemHeader = ({ repo }) => {
  return (
    <View style={styles.header}>
      <RepositoryAvatar repo={repo} />
      <RepositoryInfo repo={repo} />
    </View>
  );
};

export default RepositoryItemHeader;
