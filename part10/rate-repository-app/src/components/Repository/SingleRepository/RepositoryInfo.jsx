import { View, StyleSheet } from 'react-native';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryItem
        repo={repository}
        showGithubButton={true}
      />
	  <View style={{height: 10, backgroundColor: '#e1e4e8'}} />
    </View>
  );
};

export default RepositoryInfo;
