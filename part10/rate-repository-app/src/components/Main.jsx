import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import theme from '../theme';

import AppBar from './AppBar/AppBar';
import RepositoryList from './Repository/RepositoryList/RepositoryList';
import SignIn from './SignIn/SignIn';
import SingleRepository from './Repository/SingleRepository/SingleRepository';
import CreateReview from './CreateReview/CreateReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/createreview' element={<CreateReview />} />
        <Route path='/' element={<RepositoryList />} />
        <Route path='/repository/:id' element={<SingleRepository />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
