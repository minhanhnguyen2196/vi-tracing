import React, { Component } from 'react';
import { View, Alert, Image, Dimensions, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Picker, Icon, Text } from 'native-base';
import { setQuantity, setProductName, setDescription } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import Header from '../Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { URI } from '../../utils/config';
import { fetchTimeout } from '../../utils/fetchTimeout';
var moment = require('moment');
const axios = require('axios')

const { width, height } = Dimensions.get('window');
const logo = require('../../assets/img/logo2.png')
class InputForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            visible: false
        };
    }

    onButtonPress = () => {
        const { packageDetail, shipment, userInfo } = this.props;
        let packedShipment = {
            "$class": "com.vsii.blockchain.vitracing.Shipment",
            "productName": shipment.productName,
            "quantity": shipment.quantity,
            "notesFarmer": shipment.notesFarmer + "_" + moment().format('MMM DD YYYY HH:mm') + " - " + userInfo.username + ": " + packageDetail.descr,
            "farmer": "resource:com.vsii.blockchain.vitracing.Farmer#" + shipment.farmer.personId,
            "status": "PACKED"
        }

        this.setState({ visible: true }, () => {
            axios({
                method: 'put',
                url: URI + '/Shipment/' + shipment.qrCode,
                data: packedShipment,
                timeout: 10000
            })
                .then(res => {
                    console.log(res)
                    this.setState({ visible: false });
                    this.props.navigation.navigate('SubmitResult');
                })
                .catch(err => {
                    Alert.alert(
                        'Submit Failed',
                        'Check your connection',
                        [
                            { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
                        ],
                        { cancelable: true }
                    );
                })

            // fetchTimeout(10000,
            //     fetch(URI + '/Shipment/' + shipment.qrCode, {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             Accept: 'application/json',
            //         },
            //         body: JSON.stringify(packedShipment)
            //     })
            //         .then(res => res.json())
            //         .then(resJson => {
            //             console.log(resJson);
            //             this.setState({ visible: false });
            //             this.props.navigation.navigate('SubmitResult');
            //         })
            //         .catch(err => console.log(err))
            // ).catch(err => {
            //     console.log(err);
            //     Alert.alert(
            //         'Submit Failed',
            //         'Request timeout',
            //         [
            //             { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
            //         ],
            //         { cancelable: true }
            //     );
            // })
        })
    }

    render() {
        const { shipment } = this.props;
        let notesArray = shipment.notesFarmer.split('_');
        let noteString = notesArray.join("\n\n")

        return (
            <Container style={{ flex: 1 }}  >
                <Header icon={true} navigation={this.props.navigation} />
                <Content padder>
                    <Spinner
                        color='#27ae60'
                        visible={this.state.visible}
                        animation='slide'
                    />
                    <KeyboardAvoidingView style={{ flex: 1 }} >
                        <Text style={{ paddingVertical: 10, fontSize: 24, color: '#27ae60', fontWeight: 'bold', alignSelf: 'center' }}>Shipment Details</Text>
                        <View>
                            <Text style={styles.label}>Packaged Date</Text>
                            <TextInput
                                style={styles.input}
                                value={moment(shipment.packedDateTime).format('MMM DD YYYY')}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>QR code</Text>
                            <TextInput
                                style={styles.input}
                                value={shipment.qrCode}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Product Name</Text>
                            <TextInput
                                style={styles.input}
                                value={shipment.productName}
                                editable={false}

                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Quantity</Text>
                            <TextInput
                                style={styles.input}
                                value={shipment.quantity.toString() + ' kilograms'}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                multiline
                                style={styles.note}
                                value={noteString}
                                editable={false}
                            />

                        </View>
                        <View>
                            <Text style={styles.label}>Note</Text>
                            <TextInput
                                ref={(input) => this.desc = input}
                                onBlur={() => this.setState({ isFocused: false })}
                                onFocus={() => this.setState({ isFocused: true })}
                                style={this.state.isFocused ? styles.focusInput : styles.input}
                                onChangeText={(text) => this.props.setDescription(text)}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <Button
                            onPress={() => this.onButtonPress()}
                            block style={styles.btn}>
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
        packageDetail: state.packageDetail,
        shipment: state.shipment,
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps, {
    setQuantity,
    setProductName,
    setDescription
})(InputForm2);


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
        borderWidth: 0.5
    },
    focusInput: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '90%',
        height: 45,
        borderRadius: 5,
        borderColor: '#27ae60',
        borderWidth: 1
    },
    header: {
        backgroundColor: '#27ae60',
        height: height * 0.08,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: '#2d3436',
        paddingVertical: 15,
        paddingLeft: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: '#27ae60',
        marginTop: 40,
        marginHorizontal: 15
    }
})

