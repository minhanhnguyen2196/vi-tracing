import React, { Component } from 'react';
import { View, Image, BackHandler } from 'react-native';
import { Button, Icon, Text, Container, Content } from 'native-base';
import * as Animatable from 'react-native-animatable';

const logo = require('../../assets/img/logo2.png')
class ScanResult extends Component {
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
        const { navigation } = this.props;
        const result  = navigation.getParam('result');
        return (
            <Container>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={{ flex: 1, flexGrow: 1,  alignItems: 'center', justifyContent: 'center' }}>
                       
                        <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>VI-TRACING</Text>
                    </View>
                </View>

                {
                    (result === 'success') ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Animatable.View
                                animation='bounceInDown'
                                style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: '#27ae60', borderWidth: 5, borderColor: '#D8EEDB' }}>
                                <Icon name='check' style={{ color: 'white', fontSize: 40 }} type='FontAwesome' />
                            </Animatable.View>
                            <Text style={{ fontSize: 26, color: '#2c3e50', fontWeight: 'bold', paddingTop: 30 }}>Scan Successfull !</Text>
                            <Text style={{ color: '#636e72', paddingTop: 20 }}>Follow next steps to create a packed shipment</Text>
                            <Button
                                onPress={() => this.props.navigation.navigate('InputForm')}
                                block style={{ backgroundColor: '#27ae60', marginTop: 50, marginHorizontal: 20 }} textStyle={{ color: 'white' }} >
                                <Text>Next Step</Text>
                            </Button>
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Animatable.View
                                animation='bounceInDown'
                                style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: '#c0392b', borderWidth: 5, borderColor: '#D8EEDB' }}>
                                <Icon name='ban' style={{ color: 'white', fontSize: 40 }} type='FontAwesome' />
                            </Animatable.View>
                            <Text style={{ fontSize: 26, color: '#2c3e50', fontWeight: 'bold', paddingTop: 30 }}>Scan Failed !</Text>
                            <Text style={{ color: '#636e72', paddingTop: 20 }}>Undefined QR Code</Text>
                            <Button
                                onPress={() => this.props.navigation.navigate('Home')}
                                block style={{ backgroundColor: '#27ae60', marginTop: 50, marginHorizontal: 20 }} textStyle={{ color: 'white' }} >
                                <Text>Scan Again</Text>
                            </Button>
                        </View>
                }
            </Container>
        );
    }
}

export default ScanResult;