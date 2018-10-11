import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const logo = require('../assets/img/vsii1.png')
class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate('First');
        }, 3000);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <View>
                    <Image source={logo} />
                </View>
                <ActivityIndicator
                    style={{ paddingTop: 20 }}
                    color='green' animating size={50}
                />
            </View>
        );
    }
}

export default LoadingScreen;