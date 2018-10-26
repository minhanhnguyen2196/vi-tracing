import React, { Component } from 'react';
import { View, Alert, BackHandler, KeyboardAvoidingView, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { URI } from '../../utils/config';
import { fetchTimeout } from '../../utils/fetchTimeout';
import Header from '../Header';
console.disableYellowBox = true;
var moment = require('moment');
const {height} = Dimensions.get('window');

class FormShipper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            note: '',
            visible: false,
            submitted: false
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


    shipmentShipped = () => {
        const { shipment, userInfo } = this.props;
        if (this.state.note === '') {
            Alert.alert(
                'Warning',
                'Please fill all the required fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true }
            )
        } else {
            let noteShipper = userInfo.username + ': ' + this.state.note;
            let shipperNamespace = "resource:com.vsii.blockchain.vitracing.Shipper#";
            let newShipper =  shipperNamespace + userInfo.id;
            let shipperArray = [];
            if (shipment.shipper) {
                shipperArray = shipment.shipper;
            }  
            shipperArray.push(newShipper);
            let shippedShipment = {
                "$class": "com.vsii.blockchain.vitracing.ShipmentShipped",
                "status": "SHIPPED",
                "notesShipper": shipment.notesShipper ? shipment.notesShipper + "_" + noteShipper : noteShipper,
                "shipment": "resource:com.vsii.blockchain.vitracing.Shipment#" + shipment.qrCode,
                "shipper": shipperArray
            }
            this.setState({ visible: true }, () => {
                fetchTimeout(10000, 
                    fetch(URI + '/ShipmentShipped', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify(shippedShipment)
                    })
                        .then(res => res.json())
                        .then(resJson => {
                            console.log(resJson);
                            this.setState({ visible: false, submitted: true });
                            this.props.navigation.navigate('SubmitResult');
                        })
                        .catch(err => {
                            console.log(err);
                            Alert.alert(
                                'Submit Failed',
                                'Connection error',
                                [
                                    { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
                                ],
                                { cancelable: false }
                            );
                        })
                ). catch(err => {
                    Alert.alert(
                        'Submit Failed',
                        'Request timeout',
                        [
                            { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
                        ],
                        { cancelable: false }
                    );
                })
            })
        }
    }


    render() {
        const { userInfo, shipment } = this.props;
        let notesArray = shipment.notesShipper ? shipment.notesShipper.split('_') : [];
        let noteString = notesArray.join("\n\n");
        return (
            <Container>
                <View style={styles.header}>
                    <TouchableOpacity
                        hitSlop={{ top: 30, bottom: 20, left: 20, right: 20 }}
                        style={{ padding: 10, position: 'absolute', left: 10, top: 10, bottom: 10, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </TouchableOpacity>

                    <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5, alignSelf: 'center' }}>VI-TRACING</Text>
                </View>
                <Content padder>
                    <Spinner
                        color='#27ae60'
                        visible={this.state.visible}
                        animation='slide'
                    />
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                        <Text style={{ paddingVertical: 10, fontSize: 24, color: '#27ae60', fontWeight: 'bold', alignSelf: 'center' }}>Transportation Details</Text>
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={{ color: '#2d3436', paddingVertical: 10, paddingLeft: 15, fontSize: 16, fontWeight: 'bold' }}>Shipper ID</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.id}
                                editable={false}
                            />
                        </View>
                        {
                            shipment.notesShipper ?
                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ color: '#2d3436', paddingVertical: 10, paddingLeft: 15, fontSize: 16, fontWeight: 'bold' }}>Shipper Notes</Text>
                                    <TextInput
                                        multiline
                                        style={styles.note}
                                        value={noteString}
                                        editable={false}
                                    />
                                </View> : null
                        }
                        <View>
                            <Text style={{ color: '#2d3436', paddingVertical: 10, paddingTop: 15, paddingLeft: 15, fontSize: 16, fontWeight: 'bold' }}>Note</Text>
                            <TextInput
                                style={this.state.isFocused ? styles.focusInput : styles.inputNote}
                                ref={(input) => this.note = input}
                                onFocus={() => this.setState({ isFocused: true })}
                                onBlur={() => this.setState({ isFocused: false })}
                                multiline={true}
                                onChangeText={(text) => this.setState({ note: text })}
                            />
                        </View>
                        <Button
                            onPress={() => this.shipmentShipped()}
                            block style={{ backgroundColor: '#27ae60', marginTop: 40, marginHorizontal: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>SUBMIT PERMANENTLY</Text>
                        </Button>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        shipment: state.shipment,
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps)(FormShipper);

const styles = StyleSheet.create({
    input: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '90%',
        height: 45,
        borderRadius: 5,
        borderColor: '#95a5a6',
        borderWidth: 0.5
    },
    note: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '90%',
        borderRadius: 5,
        borderColor: '#95a5a6',
        borderWidth: 0.5,
    },
    inputNote: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '90%',
        height: 150,
        borderRadius: 5,
        borderColor: '#95a5a6',
        textAlignVertical: 'top',
        borderWidth: 0.5
    },
    focusInput: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '90%',
        height: 150,
        borderRadius: 5,
        borderColor: '#27ae60',
        borderWidth: 1,
        textAlignVertical: 'top'
    },
    header: {
        height: height * 0.1,
        backgroundColor: '#27ae60',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

