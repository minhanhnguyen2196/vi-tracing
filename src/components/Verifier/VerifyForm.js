import React, { Component } from 'react';
import { 
    View, 
    Alert,
    BackHandler, 
    Keyboard, 
    KeyboardAvoidingView, 
    StyleSheet, 
    TextInput, 
    DatePickerAndroid, DatePickerIOS, Platform
} from 'react-native';
import { 
    Container, 
    Content, 
    Button, 
    Text, 
    ListItem, 
    Left, 
    Right, 
    Radio } from 'native-base';
import Header from '../Header';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
console.disableYellowBox = true;
var moment = require('moment');
import { URI } from '../../utils/config';
const logo = require('../../assets/img/logo2.png')
class VerifyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused1: false,
            isFocused2: false,
            expiredDate: '',
            note: '',
            visible: false,
            submitted: false,
            status: true
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


    async pickDate() {
        let datePicker = DatePickerAndroid;
        if (Platform.OS === 'ios') datePicker = DatePickerIOS;
        try {
            const { action, year, month, day } = await datePicker.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
            });

            if (action !== datePicker.dismissedAction) {
                // Selected year, month (0-11), day
                console.log(year, month, day)
                this.setState({ expiredDate: moment(year + '-' + (month + 1) + '-' + day).format('ddd MMM DD YYYY') })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    shipmentVerified = () => {
        const { shipment, userInfo } = this.props;
        if (this.state.note == '' || this.state.expiredDate == '') {
            Alert.alert(
                'Warning',
                'Please fill all the required fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true }
            )
        } else {
            let verifiedShipment = {
                "$class": "com.vsii.blockchain.vitracing.ShipmentVerified",
                "note": shipment.notes + "_" + this.state.note,
                "expiredDateTime": this.state.expiredDate,
                "shipment": "resource:com.vsii.blockchain.vitracing.Shipment#" + shipment.qrCode,
                "verifier": "resource:com.vsii.blockchain.vitracing.Verifier#" + userInfo.id
            }
            this.setState({ visible: true }, () => {
                return fetch(URI + '/ShipmentVerified', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(verifiedShipment)
                })
                    .then(res => res.json())
                    .then(resJson => {
                        console.log(resJson);
                        this.setState({ visible: false, submitted: true });
                        this.props.navigation.navigate('SubmitResult');
                    })
                    .catch(err => console.log(err))
            })
        }
    }

    shipmentRejected = () => {
        const { shipment } = this.props;
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
                        this.props.navigation.navigate('SubmitResult');
                    })
                    .catch(err => console.log(err))
            })
        }
    }


    render() {
        const { submitted, status } = this.state;
        const { userInfo, shipment } = this.props;
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
                            <Text style={styles.label}>Verifier ID</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.id}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Verified Date</Text>
                            <TextInput
                                style={styles.input}
                                value={new Date().toDateString()}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Expired Date</Text>
                            <TextInput
                                onBlur={() => this.setState({ isFocused1: false })}
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    this.setState({ isFocused1: true });
                                    this.pickDate();
                                }}
                                style={this.state.isFocused1 ? styles.focusInput : styles.input}
                                value={this.state.expiredDate}
                                onSubmitEditing={() => this.note.focus()}

                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Note</Text>
                            <TextInput
                                onBlur={() => this.setState({ isFocused2: false })}
                                onFocus={() => this.setState({ isFocused2: true })}
                                style={this.state.isFocused2 ? styles.focusInput : styles.input}
                                ref={(input) => this.note = input}
                                onChangeText={(text) => this.setState({ note: text })}

                            />
                        </View>
                        <Text style={styles.label}>Verify Status</Text>
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
                                if (status) this.shipmentVerified();
                                else this.shipmentRejected();
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




// <Form>
//     <Item fixedLabel>
//         <Label>Verifier ID</Label>
//         <Input value='#V213213' editable={false} />
//     </Item>
//     <Item fixedLabel >
//         <Label>Verified Date</Label>
//         <Input value={new Date().toDateString()} editable={false} />
//     </Item>
//     <Item fixedLabel >
//         <Label>Expired Date</Label>
//         <Input />
//     </Item>
//     <Item fixedLabel >
//         <Label>Note</Label>
//         <Input />
//     </Item>

//</Form>

function mapStateToProps(state) {
    return {
        shipment: state.shipment,
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps)(VerifyForm);



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