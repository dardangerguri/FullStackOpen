import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({ children }) => {
  return (
    <Pressable>
      <Text color='header' fontWeight="bold" fontSize="heading">{children}</Text>
    </Pressable>
  );
};

export default AppBarTab;
