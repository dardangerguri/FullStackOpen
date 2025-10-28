import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from '../ui/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View><Text>Error: {error.message}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <RepositoryItem
        repo={repository}
        showGithubButton={true}
      />
    </View>
  );
};

export default SingleRepository;
