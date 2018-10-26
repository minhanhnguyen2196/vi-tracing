import React, { Component } from 'react';
import { View, Alert, Image, BackHandler, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Item, Label, Left, Right, Body, Input, Text, Radio, ListItem, Form } from 'native-base';
import { URI } from '../../utils/config';
import { fetchTimeout } from '../../utils/fetchTimeout';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../Header';
var moment = require('moment');

const logo = require('../../assets/img/logo2.png')
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
        const { status, note } = this.state;
        const { shipment, userInfo } = this.props;
        if (note == '') {
            Alert.alert(
                'Warning',
                'Please fill all the required fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true }
            )
        } else {
            let noteRetailer = userInfo.username + ": " + this.state.note;
            let receivedShipment = {
                "$class": "com.vsii.blockchain.vitracing.ShipmentReceived",
                "status": status ? "RECEIVED" : "REJECTED",
                "notesRetailer": shipment.notesRetailer ? shipment.notesRetailer + "_" + noteRetailer : noteRetailer,
                "shipment": "resource:com.vsii.blockchain.vitracing.Shipment#" + shipment.qrCode,
                "retailer": "resource:com.vsii.blockchain.vitracing.Retailer#" + userInfo.id
            }
            this.setState({ visible: true }, () => {
                fetchTimeout(10000, 
                    fetch(URI + '/ShipmentReceived', {
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
                            this.props.navigation.navigate('SubmitResult');
                        })
                        .catch(err => {
                            console.log(err);
                            Alert.alert(
                                'Submit Failed',
                                'Connection Error',
                                [
                                    { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
                                ],
                                { cancelable: true }
                            );
                        })
                ).catch(err => {
                    Alert.alert(
                        'Submit Failed',
                        'Request timeout',
                        [
                            { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
                        ],
                        { cancelable: true }
                    );
                }) 
            })
        }
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
    render() {
        const { submitted, status } = this.state;
        const { userInfo, shipment } = this.props;
        let notesArray = shipment.notesRetailer ? shipment.notesRetailer.split('_') : [];
        let noteString = notesArray.join("\n\n");
        return (
            <Container>
                <Header icon={true} navigation={this.props.navigation} />
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
                            <Text style={styles.label}>Expired Date</Text>
                            <TextInput
                                style={styles.input}
                                value={moment(shipment.expiredDateTime).format('MMM DD YYYY')}
                                editable={false}
                            />
                        </View>
                        {
                            shipment.receivedDateTime &&
                            <View>
                                <Text style={styles.label}>Received Date</Text>
                                <TextInput
                                    style={styles.input}
                                    value={moment(shipment.receivedDateTime).format('MMM DD YYYY')}
                                    editable={false}
                                />
                            </View>
                        }

                        {
                            shipment.notesRetailer &&
                            <View>
                                <Text style={styles.label}>Retailer Notes</Text>
                                <TextInput
                                    multiline
                                    style={styles.note}
                                    value={noteString}
                                    editable={false}
                                />
                            </View>
                        }

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
                        <Button
                            onPress={() => {
                                this.shipmentReceived();
                            }}
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
        fontSize: 16,
        fontWeight: 'bold'
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