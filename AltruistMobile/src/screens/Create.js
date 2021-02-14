import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';
import { Header } from 'react-native-elements';
import { TextInput, Button, Checkbox } from 'react-native-paper';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            category: '',
            urgent: false,
        };
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
                    centerComponent={{text: 'Create Errand', style: styles.textStyles}}
                />
                <View style={styles.paddedContainer}>
                    <TextInput
                        style={styles.textInputBox}
                        label='Title'
                        value={this.state.title}
                        placeholder='e.g. Grocery from Walmart'
                        mode='outlined'
                        selectionColor={Colors.primary}
                        underlineColor={Colors.primary}
                        theme={{
                            colors: {
                                primary: Colors.primary,
                            },
                        }}
                        onChangeText={(text) => {this.setState({title: text})}} />
                    <TextInput
                        style={styles.textInputPara}
                        label='Content'
                        value={this.state.content}
                        placeholder='Additional information'
                        mode='outlined'
                        selectionColor={Colors.primary}
                        underlineColor={Colors.primary}
                        theme={{
                            colors: {
                                primary: Colors.primary,
                            },
                        }}
                        onChangeText={(text) => {this.setState({content: text})}} />
                    <TextInput
                        style={styles.textInputBox}
                        label='Category'
                        value={this.state.category}
                        placeholder='eg. Grocery'
                        mode='outlined'
                        selectionColor={Colors.primary}
                        underlineColor={Colors.primary}
                        theme={{
                            colors: {
                                primary: Colors.primary,
                            },
                        }}
                        onChangeText={(text) => {this.setState({category: text})}} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16}}>Urgent: </Text>
                        <Checkbox
                            status='checked'
                            onPress={() => {
                            }}/>
                    </View>
                    <View style = {{paddingTop: 25}}>
                        <Button
                            mode='contained'
                            color={Colors.primary}
                            icon='image'>
                                Choose Image
                        </Button>
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
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    textInputBox: {
        paddingTop: 5,
        paddingBottom: 5,
        width: 320,
        height: 60,
    },
    textInputPara: {
        paddingTop: 5,
        paddingBottom: 5,
        width: 320,
        height: 120,
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
