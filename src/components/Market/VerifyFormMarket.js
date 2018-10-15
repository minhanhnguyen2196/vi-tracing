import React, { Component } from 'react';
import { View, Alert, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Item, Label, Left, Right, Body, Input, Text, Radio, ListItem, Form } from 'native-base';
import { URI } from '../../utils/config';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
const logo  = require('../../assets/img/logo2.png')
class VerifyFormMarket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            note: '',
            visible: false,
            submitted: false,
            status: true
        };
    }

    shipmentReceived = () => {
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
            let receivedShipment = {
                "$class": "com.vsii.blockchain.vitracing.ShipmentReceived",
                "note": shipment.notes + "_" + this.state.note,
                "shipment": "resource:com.vsii.blockchain.vitracing.Shipment#" + shipment.qrCode,
                "retailer": "resource:com.vsii.blockchain.vitracing.Retailer#" + userInfo.id
            }
            this.setState({ visible: true }, () => {
                return fetch(URI + '/ShipmentReceived', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(receivedShipment)
                })
                    .then(res => res.json())
                    .then(resJson => {
                        console.log(resJson);
                        this.setState({ visible: false, submitted: true })
                    })
                    .catch(err => console.log(err))
            })
        }
    }

    shipmentRejected = () => {
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
            let rejectedShipment = {
                "$class": "com.vsii.blockchain.vitracing.ShipmentRejected",
                "note": shipment.notes + "_" + this.state.note,
                "shipment": "resource:com.vsii.blockchain.vitracing.Shipment#" + shipment.qrCode,
            }
            this.setState({ visible: true }, () => {
                return fetch(URI + '/ShipmentRejected', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(rejectedShipment)
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
        const { submitted, status } = this.state;
        const { userInfo } = this.props;
        return (
            <Container>
                <View style={styles.header}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={styles.logoContainer}>
                       
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
                        <Text style={{ paddingVertical: 10, fontSize: 24, color: '#27ae60', fontWeight: 'bold', alignSelf: 'center' }}>Package Verification</Text>
                        <View>
                            <Text style={styles.label}>Retailer ID</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.id}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Imported Date</Text>
                            <TextInput
                                style={styles.input}
                                value={new Date().toDateString()}
                                editable={false}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Note</Text>
                            <TextInput
                                onBlur={() => this.setState({ isFocused: false })}
                                onFocus={() => this.setState({ isFocused: true })}
                                style={this.state.isFocused ? styles.focusInput : styles.input}
                                ref={(input) => this.note = input}
                                onChangeText={(text) => this.setState({ note: text })}
                            />
                        </View>
                        <Text style={styles.label}>Package Status</Text>
                        <ListItem>
                            <Left>
                                <Text>Pass</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.setState({ status: true })}
                                    color={"#7f8c8d"}
                                    selectedColor={"#5cb85c"}
                                    selected={status}
                                />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Reject</Text>
                            </Left>
                            <Right>
                                <Radio
                                    onPress={() => this.setState({ status: false })}
                                    color={"#7f8c8d"}
                                    selectedColor={"#5cb85c"}
                                    selected={!status}
                                />
                            </Right>
                        </ListItem>
                        {
                            submitted ?
                                <Button
                                    onPress={() => this.props.navigation.navigate('Home')}
                                    block style={styles.btn}>
                                    <Text style={{ color: 'white', fontSize: 16 }}>BACK TO HOME</Text>
                                </Button>
                                :
                                <Button
                                    onPress={() => {
                                        if (status) this.shipmentReceived();
                                        else this.shipmentRejected(); 
                                    }}
                                    block style={styles.btn}>
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

export default connect(mapStateToProps)(VerifyFormMarket);


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
    focusInput: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingLeft: 20,
        alignSelf: 'center',
        width: '90%',
        height: 45,
        borderRadius: 5,
        borderColor: '#27ae60',
        borderWidth: 1
    },
    header: {
        backgroundColor: '#27ae60', 
        height: 50, 
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
        paddingVertical: 10, 
        paddingLeft: 15, 
        fontSize: 15
    },
    btn: {
        backgroundColor: '#27ae60', 
        marginTop: 40, 
        marginHorizontal: 15
    }
})


{/* <Form>
    <Item fixedLabel style={{ marginBottom: 10 }}>
        <Label>Market ID</Label>
        <Input value='#M213213' editable={false} />
    </Item>
    <Item fixedLabel >
        <Label>Imported Date</Label>
        <Input value={new Date().toDateString()} editable={false} />
    </Item>
    <Item fixedLabel style={{ marginBottom: 10 }}>
        <Label>Note</Label>
        <Input />
    </Item>
    <Label style={{ paddingTop: 10, paddingLeft: 15, paddingBottom: 10 }}>Package Status</Label>
    <ListItem
    >
        <Left>
            <Text>Excelent</Text>
        </Left>
        <Right>
            <Radio
                color={"#7f8c8d"}
                selectedColor={"#5cb85c"}
                selected={true}
            />
        </Right>
    </ListItem>
    <ListItem
    >
        <Left>
            <Text>Damaged</Text>
        </Left>
        <Right>
            <Radio
                color={"#7f8c8d"}
                selectedColor={"#5cb85c"}
                selected={false}
            />
        </Right>
    </ListItem>
</Form>
    <Button block style={{ backgroundColor: '#27ae60', marginTop: 40, marginHorizontal: 15 }} >
        <Text>
            SUBMIT PERMANENTLY
                        </Text>
    </Button> */}