import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Messages from '../screens/Messages';
import Create from '../screens/Create';

const AppScreens = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: () => (
                <View>
                    <Icon style={[{color: Colors.tabIcon}]} size={25} name={'home'} />
                </View>
            ),
            activeColor: Colors.tabIcon,
            barStyle: {
                backgroundColor: Colors.primary,
            },
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: () => (
                <View>
                    <Icon style={[{color: Colors.tabIcon}]} size={25} name={'person-circle'} />
                </View>
            ),
            activeColor: Colors.tabIcon,
            barStyle: {
                backgroundColor: Colors.primary,
            },
        },
    },
    Messages: {
        screen: Messages,
        navigationOptions: {
            tabBarLabel: 'Messages',
            tabBarIcon: () => (
                <View>
                    <Icon style={[{color: Colors.tabIcon}]} size={25} name={'chatbox-ellipses'} />
                </View>
            ),
            activeColor: Colors.tabIcon,
            barStyle: {
                backgroundColor: Colors.primary,
            },
        },
    },
    Create: {
        screen: Create,
        navigationOptions: {
            tabBarLabel: 'Create',
            tabBarIcon: () => (
                <View>
                    <Icon style={[{color: Colors.tabIcon}]} size={25} name={'add-circle'} />
                </View>
            ),
            activeColor: Colors.tabIcon,
            barStyle: {
                backgroundColor: Colors.primary,
            },
        },
    },
}

export default createMaterialBottomTabNavigator(AppScreens);
