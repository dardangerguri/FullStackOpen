import { View, StyleSheet } from 'react-native';
import Text from '../../../ui/Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  number: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  label: {
    color: 'textSecondary',
  }
});

const RepositoryStatItem = ({ label, value }) => {
  const formatNumber = (num) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{formatNumber(value)}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default RepositoryStatItem;
