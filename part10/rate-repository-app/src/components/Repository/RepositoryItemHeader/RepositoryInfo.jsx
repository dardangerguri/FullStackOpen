import { View, StyleSheet } from 'react-native';

import Text from '../../ui/Text';
import theme from '../../../theme';

const styles = StyleSheet.create({
  details: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 25,
    flexGrow: 1,
    flex: 1,
    flexWrap: 'wrap',
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    marginTop: 4,
  },
  textSpacing: {
    marginBottom: 4,
  },
});

const RepositoryInfo = ({ repo }) => {
  return (
    <View style={styles.details}>
      <Text fontWeight={'bold'} fontSize={'subheading'} style={styles.textSpacing}>{repo.fullName}</Text>
      <Text style={styles.textSpacing}>{repo.description}</Text>
      <Text style={[styles.language, styles.textSpacing]}>{repo.language}</Text>

    </View>
  );
};

export default RepositoryInfo;
