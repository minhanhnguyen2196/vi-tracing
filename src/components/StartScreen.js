import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

const logo = require('../assets/img/vsii.png');

const farmer = require('../assets/img/farming.png');
const ship = require('../assets/img/truck.jpg');
const verify = require('../assets/img/verifier.jpg');
const market = require('../assets/img/market.jpg')

const { width, height } = Dimensions.get('window');
class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        BackHandler.exitApp();
        return true;
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Animatable.View
                    animation="slideInDown"
                    style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Image source={logo} />
                </Animatable.View>
                <Animatable.View
                    animation='fadeInLeft'
                    style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#27ae60' }}>VI-TRACING</Text>
                </Animatable.View>
                <View style={{ flex: 1 }}>
                    <Swiper style={styles.wrapper} paginationStyle={{ bottom: -30 }} >
                        <View style={styles.slide}>
                            <Image resizeMode='cover' source={farmer} style={{ width, height: height * 0.5 }} />
                        </View>
                        <View style={styles.slide}>
                            <Image  resizeMode='contain' source={verify} style={{ width, height: height * 0.5 }} />
                        </View>
                        <View style={styles.slide}>
                            <Image resizeMode='cover' source={ship} style={{ width, height: height * 0.5 }} />
                        </View>
                        <View style={styles.slide}>
                            <Image  resizeMode='cover' source={market} style={{ width, height: height * 0.5 }} />
                        </View>
                    </Swiper>
                </View>
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                        style={{ borderRadius: 25, height: 40, margin: 5, backgroundColor: '#27ae60', width: width * 0.9, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default StartScreen;

const styles = StyleSheet.create({
    slide: {
        flex: 1
    },
    wrapper: {
        paddingTop: 30,
        flex: 1
    }
})

//<Image source={image} style={{ width: 200, height: 200,  }}/>


{/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, padding: 10 }}>
    <Image source={one} style={{ width: 100, height: 100, padding: 10, margin: 5 }} />
    <Image source={two} style={{ width: 100, height: 100, padding: 10, margin: 5 }} />
</View>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, padding: 10 }}>
        <Image source={three} style={{ width: 100, height: 100, padding: 10, margin: 5 }} />
        <Image source={four} style={{ width: 100, height: 100, padding: 10, margin: 5 }} />
    </View> */}