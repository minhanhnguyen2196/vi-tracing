import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

const logo = require('../assets/img/vsii.png');
// const image = require('../assets/img/package.png');
// const one = require('../assets/img/1.png');
// const two = require('../assets/img/2.png');
// const three = require('../assets/img/3.png');
// const four = require('../assets/img/4.png');

const farmer = require('../assets/img/farming.png');
const ship = require('../assets/img/truck.jpg');
const verify = require('../assets/img/verifier.jpg');
const market = require('../assets/img/market.jpg')

const { width } = Dimensions.get('window');
class First extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderImage = () => {
        switch (key) {
            case value:

                break;

            default:
                break;
        }
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
                <View style={{ height: 300 }}>
                    <Swiper style={styles.wrapper} dot={false} >
                        <View style={styles.slide}>
                            <Image source={farmer} style={{ width, height: 250 }} />
                        </View>
                        <View style={styles.slide}>
                            <Image source={verify} style={{ width, height: 250 }} />
                        </View>
                        <View style={styles.slide}>
                            <Image source={ship} style={{ width, height: 250 }} />
                        </View>
                        <View style={styles.slide}>
                            <Image source={market} style={{ width, height: 250 }} />
                        </View>
                    </Swiper>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,  }}>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Main')}
                    style={{ borderRadius: 25 , height: 40, margin: 5, backgroundColor: '#27ae60', width: width * 0.9, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color:'white'}}>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Main')}
                    style={{ borderRadius: 25 , height: 40, margin: 5, backgroundColor: '#2980b9', width: width * 0.9, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color:'white'}}>REGISTER</Text>
                    </TouchableOpacity>
                </View>

            </Container>
        );
    }
}

export default First;

const styles = StyleSheet.create({
    slide: {
        alignItems: 'center',
    },
    wrapper: {
        paddingTop: 30,
        height: 400
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