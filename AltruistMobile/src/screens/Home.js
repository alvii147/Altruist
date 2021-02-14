import { Picker } from '@react-native-community/picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import Colors from '../constants/Colors';
import MapStyles from '../constants/MapStyles';
import MapView from 'react-native-maps'
import IP from '../constants/IP';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            errands: [],
            sortby: 'Nearest',
            modalOpen: false,
            currentItem: {},
            currentUser: {},
            latitude: 0,
            longitude: 0,
        }
    }

    getCategoryColor(cat) {
        if (cat == 'Grocery') {
            return '#00b300';
        }
        else if (cat == 'Pharmacy') {
            return '#4d4dff';
        }
        else if (cat == 'Pet Care') {
            return '#ff9933';
        }
        else if (cat == 'Laundry') {
            return '#b366ff';
        }
        else {
            return '#bfbfbf';
        }
    }

    handleView = async (item) => {
        var user = this.state.users.find(x => x.id == item.user);
        console.log('handlingView');

        const location = await fetch('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=' + user.postal_code + '&outFields=addr_type&f=pjson')
            .then(res => {
                return res.json();
            })

        this.setState({modalOpen: true, currentItem: item, currentUser: user, latitude: location.candidates[0].location.y, longitude: location.candidates[0].location.x});
    }

    componentDidMount = async () => {
        const response = await fetch(IP.baseaddr + 'api/users/')
            .then(response => {
                if (response.status > 400) {
                    console.log('Error in GET request');
                }
                return response.json();
            })

        const response2 = await fetch(IP.baseaddr + 'api/errands/')
            .then(response2 => {
                if (response2.status > 400) {
                    console.log('Error in GET request');
                }
                return response2.json();
            })
        this.setState({users: response, errands: response2});
        console.log('componentDidMount');
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal visible = {this.state.modalOpen} animationType = 'slide'>
                    <View style = {styles.modalContainer}>
                        <View style = {styles.topContainer}>
                            <Button icon="arrow-left-circle-outline" mode="contained" color={Colors.primary} onPress={() => {this.setState({modalOpen: false})}}>Back</Button>
                        </View>
                        <View style = {styles.mapContainer}>
                            {this.state.modalOpen &&
                                <MapView
                                    style={styles.map}
                                    loadingEnabled = {true}
                                    region = {{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude,
                                        latitudeDelta: 0.008,
                                        longitudeDelta: 0.008,
                                    }}
                                    customMapStyle={MapStyles.Modest}>
                                    <MapView.Marker
                                        coordinate = {{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude,
                                        }}
                                        title='Address'/>
                                </MapView>
                            }
                        </View>
                        <View style={styles.modalContentContainer}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                                {this.state.currentItem.title}
                            </Text>
                            <Text style={{textAlign: 'left', fontWeight: 'bold', color: this.getCategoryColor(this.state.currentItem.category)}}>
                                {this.state.currentItem.category}
                            </Text>
                            <Text style={{fontSize: 17}}>
                                {this.state.currentItem.content}
                            </Text>
                            <View style={{paddingTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{padding: 5}}>
                                    <Avatar.Image size={45} source={{uri: this.state.currentUser.profile_pic}} />
                                </View>
                                <View style={{padding: 5}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                                        {this.state.currentUser.first_name}
                                    </Text>
                                    <Text style={{fontSize: 12}}>
                                        Altriusm Stars: {this.state.currentUser.points}
                                    </Text>
                                </View>
                            </View>
                            <View style={{paddingTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{paddingRight: 5}}>
                                    <Button
                                        mode='contained'
                                        color={Colors.primary}
                                        icon='checkbox-marked-circle-outline'
                                        onPress={() => {this.setState({modalOpen: false}); this.props.navigation.navigate('Messages', { currentUser: this.state.currentUser})}}>
                                            Accept
                                    </Button>
                                </View>
                                <View style={{paddingRight: 5}}>
                                    <Button
                                        mode='contained'
                                        color={Colors.primary}
                                        icon='account-outline'>
                                            See Profile
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

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
                    centerComponent={{text: 'Explore Errands', style: styles.textStyles}}
                />
                <View  style = {{ padding: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 50,}}>
                    <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            Sort by:&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Button
                            mode='contained'
                            color={Colors.primary}
                            icon='arrow-down-drop-circle-outline'>
                                Nearest
                        </Button>
                    </View>
                </View>
                <FlatList
                    keyExtractor = {(item) => item.id.toString()}
                    data={this.state.errands}
                    renderItem = {({item}) => (
                        <View style={styles.cardContainer}>
                            <Card style={styles.cardStyles}>
                                <Card.Content>
                                    <Title>
                                        {item.title}
                                    </Title>
                                    <Paragraph>
                                        {item.content}
                                    </Paragraph>
                                </Card.Content>
                                <Card.Cover source = {{ uri: item.image }} style={{padding: 10, backgroundColor: '#ffffff'}}/>
                                <Card.Actions>
                                    <View style={styles.actionsContainer}>
                                        <View style={styles.buttonDiv}>
                                            <View style={styles.buttonContainer}>
                                                <Button
                                                    mode='contained'
                                                    color={Colors.primary}
                                                    icon='view-sequential'
                                                    onPress={() => {this.handleView(item)}}>
                                                        View
                                                </Button>
                                            </View>
                                            <View style={styles.buttonContainer}>
                                                <Button
                                                    mode='contained'
                                                    color={Colors.primary}
                                                    icon='checkbox-marked-circle-outline'>
                                                        Accept
                                                </Button>
                                            </View>
                                        </View>
                                        <View style={styles.categoryDiv}>
                                            <View style={styles.categoryContainer}>
                                                <Text style={{textAlign: 'right', fontWeight: 'bold', color: this.getCategoryColor(item.category)}}>
                                                    {item.category}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card.Actions>
                            </Card>
                        </View>
                    )}
                />
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
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.secondary,
        padding: 15,
    },
    cardStyles: {
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderRadius: 20,
    },
    headerStyles: {
        paddingTop: 50,
    },
    textStyles: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContainer: {
        padding: 10,
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonDiv: {
        flex: 1,
        flexDirection: 'row',
    },
    categoryDiv: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    buttonContainer: {
        paddingRight: 10,
    },
    categoryContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapContainer: {
        flex: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    map: {
        height: 400,
    },
    modalContentContainer: {
        flex: 7,
        justifyContent: 'center',
        padding: 4,
    },
});
