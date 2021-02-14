import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Colors from '../constants/Colors';
import { Header } from 'react-native-elements';
import { IconButton, Avatar } from 'react-native-paper';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log(this.props.navigation.state.params.currentUser);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    style={styles.headerStyles}
                    statusBarProps={{
                        backgroundColor: '#000000',
                    }}
                    containerStyle={{
                        paddingTop: 45,
                        backgroundColor: Colors.primary,
                    }}
                    leftComponent={{ icon: 'home', color: '#ffffff' }}
                    centerComponent={{text: 'Messages', style: styles.textStyles}}
                />
                {this.props.navigation.state.params != undefined &&
                <View style={{flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#999999', borderBottomWidth: 1,}}>
                    <View style={{padding: 10}}>
                        <Avatar.Image size={80} source={{uri: this.props.navigation.state.params.currentUser.profile_pic}} />
                    </View>
                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 30}}>
                            {this.props.navigation.state.params.currentUser.first_name}&nbsp;{this.props.navigation.state.params.currentUser.last_name}
                        </Text>
                    </View>
                </View>}
                <View style={styles.paddedContainer}>
                    <View style={styles.mainContainer}>
                    <IconButton
                        icon='message-processing'
                        color='#ffe0cc'
                        size={150}
                    />
                    </View>
                    <View style={styles.textInputContainer}>
                        <View>
                            <TextInput
                                style={{ height: 40, width: 380, backgroundColor: '#ffffff', borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={() => {}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paddedContainer: {
        flex: 6,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    mainContainer: {
        flex: 9,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputContainer: {
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    headerStyles: {
        paddingTop: 50,
    },
    textStyles: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
