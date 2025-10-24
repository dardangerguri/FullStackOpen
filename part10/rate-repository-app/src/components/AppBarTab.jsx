import { Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const AppBarTab = ({ route, children }) => {
  return (
    <Pressable style={{ paddingHorizontal: 10 }}>
      <Link to={route}>
        <Text color='header' fontWeight="bold" fontSize="heading">{children}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
