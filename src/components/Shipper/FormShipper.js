import React, { Component } from 'react';
import { View, Alert, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, DatePickerAndroid } from 'react-native';
import { Container, Content, Button, Icon, Item, Label, Input, Text, Form, ListItem, Left, Right, Body, Radio } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { URI } from '../../utils/config';
console.disableYellowBox = true;
var moment = require('moment');
const logo  = require('../../assets/img/logo2.png')

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

    async pickDate() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.log(year, month, day)
                this.setState({ expiredDate: moment(year + '/' + (month + 1) + '/' + day).format('ddd MMM DD YYYY') })

            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    shipmentShipped = () => {
        const { shipment, userInfo } = this.props;
        if (this.state.note == '') {
            Alert.alert(
                'Warning',
                'Please fill all the required fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true }
            )
        } else {
            let shippedShipment = {
                "$class": "com.vsii.blockchain.vitracing.ShipmentShipped",
                "note": shipment.notes + "_" + this.state.note,
                "shipment": "resource:com.vsii.blockchain.vitracing.Shipment#" + shipment.qrCode,
                "shipper": "resource:com.vsii.blockchain.vitracing.Shipper#" + userInfo.id
            }
            this.setState({ visible: true }, () => {
                return fetch(URI + '/ShipmentShipped', {
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
                    })
                    .catch(err => console.log(err))
            })
        }
    }


    render() {
        const { submitted } = this.state;
        const { userInfo } = this.props;
        return (
            <Container>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={logo} />
                        <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>VI-TRACING</Text>
                    </View>
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
                            <Text style={{ color: '#2d3436', paddingVertical: 10, paddingLeft: 15, fontSize: 15 }}>Shipper ID</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.id}
                                editable={false}
                            />
                        </View>

                        <View>
                            <Text style={{ color: '#2d3436', paddingVertical: 10, paddingTop: 15, paddingLeft: 15, fontSize: 15 }}>Note</Text>
                            <TextInput
                                style={this.state.isFocused ? styles.focusInput : styles.inputNote}
                                ref={(input) => this.note = input}
                                onFocus={() => this.setState({ isFocused: true })}
                                onBlur={() => this.setState({ isFocused: false })}
                                multiline={true}
                                onChangeText={(text) => this.setState({ note: text })}
                            />
                        </View>
                        {
                            submitted ?
                                <Button
                                    onPress={() => this.props.navigation.navigate('Home')}
                                    block style={{ backgroundColor: '#27ae60', marginTop: 40, marginHorizontal: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 16 }}>BACK TO HOME</Text>
                                </Button>
                                :
                                <Button
                                    onPress={() => this.shipmentShipped()}
                                    block style={{ backgroundColor: '#27ae60', marginTop: 40, marginHorizontal: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 16 }}>SUBMIT PERMANENTLY</Text>
                                </Button>
                        }
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
        paddingLeft: 20,
        alignSelf: 'center',
        width: '90%',
        height: 45,
        borderRadius: 5,
        borderColor: '#95a5a6',
        borderWidth: 0.5
    },
    inputNote: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingLeft: 20,
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
        paddingLeft: 20,
        alignSelf: 'center',
        width: '90%',
        height: 150,
        borderRadius: 5,
        borderColor: '#27ae60',
        borderWidth: 1,
        textAlignVertical: 'top'
    }
})

