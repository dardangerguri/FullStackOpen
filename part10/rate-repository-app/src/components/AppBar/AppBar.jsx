import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.header,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 25,
    flexDirection: 'row',
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab route={'/'}>Repositories</AppBarTab>
        <AppBarTab route={'/signin'}>Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
