import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Linking, Vibration, Dimensions, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button, Icon, Text } from 'native-base';
import { getShipment } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { URI } from '../../utils/config';
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

    onBarCodeRead = (e) => {
        this.setState({ qrcode: e.data });
        Vibration.vibrate();
        this.setState({ scanning: false });
        fetch(URI + '/Shipment/' + e.data, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.error) {
                    this.props.navigation.navigate('ScanResult', { result: 'denied' });
                    return Promise.reject(new Error('Fail!'));
                } else {
                    if (resJson.verifiedDateTime) {
                        this.props.getShipment(resJson);
                        this.props.navigation.navigate('FormShipper');
                    } else {
                        alert('The Shipment has not been verified yet');
                        this.props.navigation.navigate('Home');
                    }

                }
            })
            .catch(err => console.log(err))

    }

    render() {
        const { scanning } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={{ flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                       
                        <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>VI-TRACING</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    {
                        scanning &&
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