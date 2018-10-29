import React, { Component } from 'react';
import { View, Alert, ActivityIndicator, Linking, Vibration, Dimensions, StyleSheet, BackHandler } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button, Icon, Text } from 'native-base';
import { getShipment } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { URI } from '../../utils/config';
import Header from '../Header';

const axios = require('axios');
const logo = require('../../assets/img/logo2.png')
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class ScanShipper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: true,
            qrcode: ''
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    onBarCodeRead = (e) => {
        this.setState({ qrcode: e.data });
        Vibration.vibrate();
        this.setState({ scanning: false });

        axios({
            method: 'get',
            url: URI + '/Shipment/' + e.data,
            timeout: 10000
        })
            .then(res => {
                if (res.data.verifiedDateTime) {
                    this.props.getShipment(res.data);
                    this.props.navigation.navigate('FormShipper');
                } else {
                    alert('The Shipment has not been verified yet');
                    this.props.navigation.navigate('Home');
                }
            })
            .catch(err => {
                if (err.response) {
                    this.props.navigation.navigate('ScanResult', { result: 'denied' });
                } else if (err.request) {
                    Alert.alert(
                        'Connection Error',
                        'Please check your internet connection',
                        [
                            { text: 'Try again', onPress: () => this.setState({ scanning: true }) },
                        ],
                        { cancelable: true }
                    );
                }
            })

        // fetchTimeout(20000,
        //     fetch(URI + '/Shipment/' + e.data, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     })
        //         .then(res => res.json())
        //         .then(resJson => {
        //             if (resJson.error) {
        //                 this.props.navigation.navigate('ScanResult', { result: 'denied' });
        //                 return Promise.reject(new Error('Fail!'));
        //             } else {
        //                 if (resJson.verifiedDateTime) {
        //                     this.props.getShipment(resJson);
        //                     this.props.navigation.navigate('FormShipper');
        //                 } else {
        //                     alert('The Shipment has not been verified yet');
        //                     this.props.navigation.navigate('Home');
        //                 }
        //             }
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             Alert.alert(
        //                 'Connection Error',
        //                 'Please check your internet connection',
        //                 [
        //                     { text: 'Try again', onPress: () => this.setState({ scanning: true }) },
        //                 ],
        //                 { cancelable: true }
        //             );
        //         })
        // ).catch(err => {
        //     Alert.alert(
        //         'Request timeout',
        //         'Please check your internet connection',
        //         [
        //             { text: 'Try again', onPress: () => this.setState({ scanning: true }) },
        //         ],
        //         { cancelable: true }
        //     );
        // })
    }

    render() {
        const { scanning } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header icon={true} navigation={this.props.navigation} />
                <View style={styles.container}>
                    {
                        scanning ?
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.on}
                                permissionDialogTitle={'Permission to use camera'}
                                permissionDialogMessage={'We need your permission to use your camera phone'}
                                onBarCodeRead={this.onBarCodeRead}
                            >
                                <View style={styles.rectangle}>
                                    <View style={styles.rectangleColor} />
                                    <View style={styles.topLeft} />
                                    <View style={styles.topRight} />
                                    <View style={styles.bottomLeft} />
                                    <View style={styles.bottomRight} />
                                </View>
                                <View style={{ position: 'absolute', bottom: 20, justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>Place the QR Code inside the area to Scan it</Text>
                                </View>
                            </RNCamera>
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' color='green' animating />
                            </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    scanText: {
        alignSelf: 'center',
        paddingVertical: 30,
        fontSize: 15
    },
    scanButton: {
        backgroundColor: '#27ae60',
        height: 120,
        width: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rectangle: {
        position: 'absolute',
        borderLeftColor: 'rgba(0, 0, 0, .3)',
        borderRightColor: 'rgba(0, 0, 0, .3)',
        borderTopColor: 'rgba(0, 0, 0, .3)',
        borderBottomColor: 'rgba(0, 0, 0, .3)',
        borderLeftWidth: deviceWidth / 1,
        borderRightWidth: deviceWidth / 1,
        borderTopWidth: deviceHeight / 4,
        borderBottomWidth: deviceHeight / 1,
    },
    rectangleColor: {
        height: 250,
        width: 250,
        backgroundColor: 'transparent',
    },
    topLeft: {
        width: 50,
        height: 50,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        position: 'absolute',
        left: -1,
        top: -1,
        borderLeftColor: 'green',
        borderTopColor: 'green'
    },
    topRight: {
        width: 50,
        height: 50,
        borderTopWidth: 2,
        borderRightWidth: 2,
        position: 'absolute',
        right: -1,
        top: -1,
        borderRightColor: 'green',
        borderTopColor: 'green'
    },
    bottomLeft: {
        width: 50,
        height: 50,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        position: 'absolute',
        left: -1,
        bottom: -1,
        borderLeftColor: 'green',
        borderBottomColor: 'green'
    },
    bottomRight: {
        width: 50,
        height: 50,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        position: 'absolute',
        right: -1,
        bottom: -1,
        borderRightColor: 'green',
        borderBottomColor: 'green'
    },
    close: {
        width: deviceWidth,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: deviceHeight / 7,
    }
});

function mapStateToProps(state) {
    return {
        shipment: state.shipment
    };
}

export default connect(mapStateToProps, { getShipment })(ScanShipper);