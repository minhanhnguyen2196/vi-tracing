/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Linking, Vibration } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Authentication from './src/components/Authentication/Main';
import Login from './src/components/Authentication/Login';
import { AppStack } from './src/router';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: true,

        }
    }

    render() {
        return (
            <Provider store={store}>
                <AppStack />
            </Provider>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
