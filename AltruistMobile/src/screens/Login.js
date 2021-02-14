import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../constants/Colors';
import IP from '../constants/IP';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.loginButtonPressHandler.bind(this);
    }

    loginButtonPressHandler = async () => {
        const response = await fetch(IP.baseaddr + 'api/users/')
            .then(response => {
                if (response.status > 400) {
                    console.log('Error in GET request');
                }
                return response.json();
            })

        for(var i = 0; i < response.length; i++) {
            if(this.state.username == response[i].username) {
                await AsyncStorage.setItem('userid', response[i].id.toString());
                await AsyncStorage.setItem('username', response[i].username);
                console.log('Logged in as ' + response[i].first_name);
            }
        }
        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/pink_transparent_ebabe2.png')} style={styles.logo}></Image>
                    </View>
                    <View style={styles.loginContainer}>
                        <TextInput
                            style={styles.textInputBox}
                            label='Username'
                            value={this.state.username}
                            placeholder='e.g. wwilson1991'
                            mode='outlined'
                            selectionColor={Colors.primary}
                            underlineColor={Colors.primary}
                            theme={{
                                colors: {
                                    primary: Colors.primary,
                                },
                            }}
                            onChangeText={username => this.setState({ username: username })} />
                        <TextInput
                            style={styles.textInputBox}
                            label='Password'
                            value={this.state.password}
                            secureTextEntry={true}
                            placeholder='e.g. 9#7@P+d3N%'
                            mode='outlined'
                            selectionColor={Colors.primary}
                            underlineColor={Colors.primary}
                            theme={{
                                colors: {
                                    primary: Colors.primary,
                                },
                            }}
                            onChangeText={password => this.setState({ password: password })} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button
                            onPress={this.loginButtonPressHandler}
                            mode='contained'
                            color={Colors.primary}>
                                Log in
                        </Button>
                    </View>
                    <View style={styles.registerWrapper}>
                        <Text>
                            Need an account?&nbsp;
                            <Text style={styles.registerText} onPress={() => {this.props.navigation.navigate('Register');}}>
                                Register
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 160,
        height: 160,
    },

    loginContainer: {
        flex: 2,
        justifyContent: 'center',
        width: 250,
        height: 153,
    },

    textInputBox: {
        paddingTop: 5,
        paddingBottom: 5,
    },

    buttonWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
    },

    registerWrapper: {
        flex: 3,
        paddingTop: 15,
    },

    registerText: {
        color: Colors.primary,
    },
});
