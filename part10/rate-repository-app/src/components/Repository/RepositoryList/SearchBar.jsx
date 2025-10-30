import { View, TextInput, StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    padding: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: theme.colors.textSecondary,
    borderRadius: 9,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
});

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search repositories..."
        value={searchQuery}
        onChangeText={onSearchChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;
