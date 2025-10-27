import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
    margin: 20,
  },
});

const RepositoryAvatar = ({ repo }) => {
  return <Image style={styles.avatar} source={{ uri: repo.ownerAvatarUrl }} />;
};

export default RepositoryAvatar;
