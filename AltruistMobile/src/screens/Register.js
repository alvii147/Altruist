import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../constants/Colors';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
        };
        this.registerButtonPressHandler.bind(this);
    }

    registerButtonPressHandler = async () => {
        this.props.navigation.navigate('Login');
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
                    <View style={styles.registerContainer}>
                        <TextInput
                            style={styles.textInputBox}
                            label='First Name'
                            value={this.state.firstname}
                            placeholder='e.g. Wade'
                            mode='outlined'
                            selectionColor={Colors.primary}
                            underlineColor={Colors.primary}
                            theme={{
                                colors: {
                                    primary: Colors.primary,
                                },
                            }}
                            onChangeText={firstname => this.setState({ firstname: firstname })} />
                        <TextInput
                            style={styles.textInputBox}
                            label='Last Name'
                            value={this.state.lastname}
                            placeholder='e.g. Wilson'
                            mode='outlined'
                            selectionColor={Colors.primary}
                            underlineColor={Colors.primary}
                            theme={{
                                colors: {
                                    primary: Colors.primary,
                                },
                            }}
                            onChangeText={lastname => this.setState({ lastname: lastname })} />
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
                            onPress={this.registerButtonPressHandler}
                            mode='contained'
                            color={Colors.primary}>
                                Register
                        </Button>
                    </View>
                    <View style={styles.loginWrapper}>
                        <Text>
                            Already have an account?&nbsp;
                            <Text style={styles.loginText} onPress={() => {this.props.navigation.navigate('Login');}}>
                                Log in
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

    registerContainer: {
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
        flex: 3,
        justifyContent: 'flex-end',
    },

    loginWrapper: {
        flex: 2,
        paddingTop: 15,
    },

    loginText: {
        color: Colors.primary,
    },
});
