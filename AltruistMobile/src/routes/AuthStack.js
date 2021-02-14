import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthScreens = {
    Login: {
        screen: Login,
        navigationOptions: {
            header: () => false,
        },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: () => false,
        },
    }
}

export default createStackNavigator(AuthScreens);
