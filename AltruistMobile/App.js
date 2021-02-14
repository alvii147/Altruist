import React, { Component } from 'react';
import AppContainer from './src/routes/AppContainer';

export default class App extends Component {
    state = {
        isUserAuth: false,
    }

    componentDidMount() {
        //this.setState({isUserAuth: true});
    }

    render() {
        return (
            <AppContainer />
        );
    }
}
