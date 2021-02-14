import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default createAppContainer (
    createSwitchNavigator
    (
        {
            Auth: AuthStack,
            App: AppStack,
        },
        {
            initialRouteName: 'Auth',
        }
    )
);
