import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Avatar, IconButton, Button } from 'react-native-paper';
import { Header } from 'react-native-elements';
import Colors from '../constants/Colors';
import { VictoryPie } from 'victory-native';
import IP from '../constants/IP';

const graphicColor = ["tomato", "orange", "gold"];
const wantedGraphicData = [{ x: "Accepted", y: 35 }, { x: "Completed", y: 20 }, { x: "Created", y: 3 }];
const defaultGraphicData = [{ x: 'Accepted', y: 1 }, { x: 'Completed', y: 0 }, { x: 'Created', y: 0 }];

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageurl: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
            city: '',
            country: '',
            errands_completed: 0,
            points: 0,
            graphicData: defaultGraphicData,
        }
    }

    componentDidMount = async () => {
        const async_user_id = await AsyncStorage.getItem('userid');
        console.log(async_user_id);
        const response = await fetch(IP.baseaddr + 'api/users/' + async_user_id.toString())
            .then(response => {
                if (response.status > 400) {
                    console.log('Error in GET request');
                }
                return response.json();
            })
        console.log(response);
        this.setState({
            first_name: response.first_name,
            last_name: response.last_name,
            imageurl: response.profile_pic,
            city: response.city,
            country: response.country,
            errands_completed: response.errands_completed,
            points: response.points,
        })
        console.log(this.state.name);
        this.setState({graphicData: wantedGraphicData});
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
                    centerComponent={{text: 'Profile', style: styles.textStyles}}
                />
                <View style={styles.paddedContainer}>
                    <View style={styles.topContainer}>
                        <Avatar.Image size={200} source={{uri: this.state.imageurl}} />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 21}}>
                                    {this.state.points}
                                </Text>
                                <IconButton
                                    icon='star-face'
                                    color='yellow'
                                    size={20}
                                />
                            </View>
                            <View style={{flex: 10, alignItems: 'center'}}>
                                <Text style={{fontSize: 35, fontWeight: 'bold'}}>
                                    &nbsp;&nbsp;{this.state.first_name}&nbsp;{this.state.last_name}&nbsp;&nbsp;
                                </Text>
                                <Text>
                                    {this.state.city},&nbsp;{this.state.country}
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 2, alignItems: 'center'}}>
                            <Text style={{fontSize: 18}}>
                                Past Errands Data:
                            </Text>
                            <VictoryPie
                                animate={{delay: 5, duration: 2000, linear: 'exp' }}
                                data={this.state.graphicData}
                                height={250}
                                colorScale={graphicColor}
                            />
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <View style={styles.buttonDiv}>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            mode='contained'
                                            color={Colors.primary}
                                            icon='plus'>
                                                New Errand
                                        </Button>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            mode='contained'
                                            color={Colors.primary}
                                            icon='square-edit-outline'>
                                                Edit Profile
                                        </Button>
                                    </View>
                                </View>
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
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    headerStyles: {
        paddingTop: 50,
    },
    textStyles: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    topContainer: {
        flex: 2,
    },
    contentContainer: {
        flex: 4,
    },
    buttonDiv: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        padding: 10,
    },
});
