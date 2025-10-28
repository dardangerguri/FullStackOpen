import { Pressable, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import Text from '../ui/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const OpenInGithubButton = ({ url }) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Open in GitHub</Text>
    </Pressable>
  );
};

export default OpenInGithubButton;
