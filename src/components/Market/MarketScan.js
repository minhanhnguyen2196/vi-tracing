import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Linking, Vibration, Dimensions, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button, Icon, Text } from 'native-base';
import { getShipment } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { URI } from '../../utils/config';
import Header from '../Header';
const logo = require('../../assets/img/logo2.png')
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class MarketScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: true,
            qrcode: '',
        };
    }

    onBarCodeRead = (e) => {
        this.setState({ qrcode: e.data });
        Vibration.vibrate();
        this.setState({ scanning: false });
        const url = URI + '/Shipment/' + e.data;
        const data = { filter: '{"include":"resolve"}' };
        const params = Object.keys(data).map(key => key + '=' +
            encodeURIComponent(data[key])).join('&');
        const fullUrl = url + `${params ? '?' + params : ''}`;

        fetch(fullUrl, {
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
                    if (resJson.shippedDateTime) {
                        this.props.getShipment(resJson);
                        this.props.navigation.navigate('PackageDetailForMarket');
                    } else {
                        alert('The shipment has not been delivered yet');
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
                <Header icon={true} navigation={this.props.navigation}/>

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

export default connect(mapStateToProps, { getShipment })(MarketScan);