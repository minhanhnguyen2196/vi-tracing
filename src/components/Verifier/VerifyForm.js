import React, { Component } from 'react';
import {
    View,
    Alert,
    BackHandler,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    DatePickerAndroid, Platform
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    ListItem,
    Left,
    Right,
    Radio, DatePicker
} from 'native-base';
import Header from '../Header';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
console.disableYellowBox = true;
var moment = require('moment');
import { URI } from '../../utils/config';
import { fetchTimeout } from '../../utils/fetchTimeout';
const logo = require('../../assets/img/logo2.png')
const axios = require('axios');
class VerifyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused1: false,
            isFocused2: false,
            expiredDate: new Date(),
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

    setDate = (newDate) => {
        this.setState({ expiredDate: moment(newDate).format('ddd MMM DD YYYY') });
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
                this.setState({ expiredDate: moment(year + '-' + (month + 1) + '-' + day).format('ddd MMM DD YYYY') })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }


    shipmentVerified = () => {
        const { status, note } = this.state;
        const { shipment, userInfo } = this.props;
        if (note == '' || this.state.expiredDate == '') {
            Alert.alert(
                'Warning',
                'Please fill all the required fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true }
            )
        } else {
            let noteVerifier = userInfo.username + ": " + this.state.note;
            let verifierNamespace = "resource:com.vsii.blockchain.vitracing.Verifier#"
            let newVerifier = verifierNamespace + userInfo.id;
            let verifierArray = [];
            if (shipment.verifier) {
                verifierArray = shipment.verifier.map(verifier => { return verifierNamespace + verifier.personId })
            }
            verifierArray.push(newVerifier);
            let verifiedShipment = {
                "$class": "com.vsii.blockchain.vitracing.ShipmentVerified",
                "status": status ? "VERIFIED" : "REJECTED",
                "notesVerifier": shipment.notesVerifier ? shipment.notesVerifier + "_" + moment().format('HH:mm') + ' - ' + noteVerifier : moment().format('HH:mm') + ' - ' + noteVerifier,
                "expiredDateTime": shipment.expiredDateTime ? shipment.expiredDateTime : this.state.expiredDate,
                "shipment": "resource:com.vsii.blockchain.vitracing.Shipment#" + shipment.qrCode,
                "verifier": verifierArray
            }
            this.setState({ visible: true }, () => {
                axios({
                    method: 'post',
                    url: URI + '/ShipmentVerified',
                    data: verifiedShipment,
                    timeout: 10000
                })
                    .then(res => {
                        console.log(res);
                        this.setState({ visible: false });
                        this.props.navigation.navigate('SubmitResult');
                    })
                    .catch(err => {
                        Alert.alert(
                            'Submit Failed',
                            'Request timeout',
                            [
                                { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
                            ],
                            { cancelable: false }
                        );
                    })

                // fetchTimeout(10000,
                //     fetch(URI + '/ShipmentVerified', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             Accept: 'application/json',
                //         },
                //         body: JSON.stringify(verifiedShipment)
                //     })
                //         .then(res => res.json())
                //         .then(resJson => {
                //             console.log(resJson);
                //             this.setState({ visible: false });
                //             this.props.navigation.navigate('SubmitResult');

                //         })
                //         .catch(err => console.log(err))
                // ).catch(err => {
                //     Alert.alert(
                //         'Submit Failed',
                //         'Request timeout',
                //         [
                //             { text: 'Try Again', onPress: () => this.setState({ visible: false }) },
                //         ],
                //         { cancelable: false }
                //     );
                // })
            })
        }
    }

    render() {
        const { status } = this.state;
        const { userInfo, shipment } = this.props;
        let notesArray = shipment.notesVerifier ? shipment.notesVerifier.split('_') : [];
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
                            <Text style={styles.label}>Verifier ID</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.id}
                                editable={false}
                            />
                        </View>
                        {
                            shipment.verifiedDateTime &&
                            <View>
                                <Text style={styles.label}>Verified Date</Text>
                                <TextInput
                                    style={styles.input}
                                    value={moment(shipment.verifiedDateTime).format('ddd MMM DD YYYY')}
                                    editable={false}
                                />
                            </View>
                        }
                        {
                            shipment.notesVerifier &&
                            <View>
                                <Text style={styles.label}>Verifier Note</Text>
                                <TextInput
                                    multiline
                                    style={styles.note}
                                    value={noteString}
                                    editable={false}
                                />
                            </View>
                        }
                        {
                            shipment.expiredDateTime ? null
                                :
                                <View>
                                    <Text style={styles.label}>Expired Date</Text>
                                    <View style={{
                                        height: 45,
                                        borderRadius: 5,
                                        borderColor: '#95a5a6',
                                        borderWidth: 0.5,
                                        padding: 5,
                                        justifyContent: 'center',
                                        backgroundColor: '#FBFBFC',
                                        marginHorizontal: 15
                                    }}>
                                        <DatePicker
                                            defaultDate={new Date()}
                                            formatChosenDate={date => { return moment(date).format('ddd MMM DD YYYY') }}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            placeHolderText="Select date"
                                            textStyle={{ color: "black", fontSize: 18 }}
                                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                                            onDateChange={this.setDate}
                                        />
                                    </View>
                                </View>
                        }

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
                            onPress={() => this.shipmentVerified()}
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

export default connect(mapStateToProps)(VerifyForm);

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