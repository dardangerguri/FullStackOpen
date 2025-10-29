import { View, StyleSheet, Pressable } from 'react-native';
import RepositoryItemHeader from './RepositoryItemHeader/RepositoryItemHeader';
import RepositoryStats from './RepositoryStats/RepositoryStats';
import OpenInGithubButton from './OpenInGithubButton';

const styles = StyleSheet.create({
  RepositoryItem: {
    backgroundColor: 'white',
  },
});

const RepositoryItem = ({ repo, showGithubButton = false, onPress }) => {
  const content = (
    <View style={styles.RepositoryItem} testID="repositoryItem">
      <RepositoryItemHeader repo={repo} />
      <RepositoryStats repo={repo} />
      {showGithubButton && <OpenInGithubButton url={repo.url} />}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
};

export default RepositoryItem;
