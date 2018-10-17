import React, { Component } from 'react';
import { View, Image, BackHandler, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon, Text, Container, Content } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Header from '../Header';

const { height, width } = Dimensions.get('window');
const logo = require('../../assets/img/logo2.png')


class SubmitResult extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.navigation.navigate('Home');
        return true;
    }


    render() {
        return (
            <Container>
                <View style={styles.header}>
                    <TouchableOpacity
                        hitSlop={{ top: 30, bottom: 20, left: 20, right: 20 }}
                        style={styles.backBtn}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5, fontSize: 18 }}>VI-TRACING</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animatable.View
                        animation='bounceInDown'
                        style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: '#27ae60', borderWidth: 5, borderColor: '#D8EEDB' }}>
                        <Icon name='check' style={{ color: 'white', fontSize: 40 }} type='FontAwesome' />
                    </Animatable.View>
                    <Text style={{ fontSize: 26, color: '#2c3e50', fontWeight: 'bold', paddingTop: 30, alignSelf: 'center' }}>Submit Successfull !</Text>
                    <Text style={{ color: '#636e72', paddingTop: 20, paddingVertical: 10 }}>
                        The shipment has been updated
                    </Text>
                    <Button
                        onPress={() => this.props.navigation.navigate('Home')}
                        block style={{ backgroundColor: '#27ae60', marginTop: 50, marginHorizontal: 20 }} textStyle={{ color: 'white' }} >
                        <Text>Back Home</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default SubmitResult;

const styles = StyleSheet.create({
    header: {
        height: height * 0.1,
        backgroundColor: '#27ae60',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    backBtn : {
        padding: 10, 
        position: 'absolute', 
        left: 10, 
        top: 10, 
        bottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})