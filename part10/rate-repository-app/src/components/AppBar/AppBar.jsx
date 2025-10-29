import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import Text from '../ui/Text';
import theme from '../../theme';
import useMe from '../../hooks/useMe';
import useSignOut from '../../hooks/useSignOut';

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
  const { me, loading } = useMe();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab route={'/'}>Repositories</AppBarTab>
        {me ? (
          <>
            <AppBarTab route={'/createreview'}>Create a review</AppBarTab>
            <AppBarTab onPress={handleSignOut}>Sign Out</AppBarTab>
          </>
        ) : (
          <AppBarTab route={'/signin'}>Sign In</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
