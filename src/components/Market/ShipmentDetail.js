import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import Timeline from 'react-native-timeline-listview';
import Header from '../Header';

var moment = require('moment');

class ShipmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [

            ]
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

    componentWillMount() {
        const { navigation } = this.props;
        const shipment = navigation.getParam('shipment');
        const packedDateTime = moment(shipment.packedDateTime).format('MMM DD');
        const verifiedDateTime = shipment.verifiedDateTime ? moment(shipment.verifiedDateTime).format('MMM DD') : '?';
        const shippedDateTime = shipment.shippedDateTime ? moment(shipment.shippedDateTime).format('MMM DD') : '?';
        const receivedDateTime = shipment.receivedDateTime ? moment(shipment.receivedDateTime).format('MMM DD') : '?';

        const notesFarmerArray = shipment.notesFarmer.split('_');
        const notesFarmer = notesFarmerArray.join("\n");

        const notesVerifierArray = shipment.notesVerifier ? shipment.notesVerifier.split('_') : [];
        const notesVerifier = notesVerifierArray.length > 0 ? notesVerifierArray.join("\n") : 'The shipment has not been verified';

        const notesShipperArray = shipment.notesShipper ? shipment.notesShipper.split('_') : [];
        const notesShipper = notesShipperArray.length > 0 ? notesShipperArray.join("\n") : 'The shipment has not been shipped';

        const notesRetailerArray = shipment.notesRetailer ? shipment.notesRetailer.split('_') : [];
        const notesRetailer = notesRetailerArray.length > 0 ? notesRetailerArray.join("\n") : 'The shipment has not been received';

        this.setState({
            data: [
                { time: packedDateTime, title: 'Packed', description: notesFarmer },
                { time: verifiedDateTime, title: 'Verification', description: notesVerifier },
                { time: shippedDateTime, title: 'Transportation', description: notesShipper },
                { time: receivedDateTime, title: 'Receipt', description: notesRetailer }
            ]
        })
    }

    onVerifierButtonPress = () => {
        const { navigation } = this.props;
        const shipment = navigation.getParam('shipment');
        if (shipment.verifier) {
            this.props.navigation.navigate('VerifierOrg', { id: shipment.verifier.org.orgID })
        } else alert('The shipment has not been verified by any organization')
    }

    onShipperButtonPress = () => {
        const { navigation } = this.props;
        const shipment = navigation.getParam('shipment');
        if (shipment.shipper) {
            this.props.navigation.navigate('ShipperOrg', { id: shipment.shipper.org.orgID })
        } else alert('The shipment has not been delivered by any organization')
    }
    render() {
        const { navigation } = this.props;
        const shipment = navigation.getParam('shipment');
        return (
            <Container style={{ flex: 1 }}>
                <Header icon={true} navigation={this.props.navigation} />
                <Content padder >
                    <View style={{ flex: 1, padding: 5 }}>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('FarmerOrg', { id: shipment.farmer.org.orgID })}
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='home' type='FontAwesome' style={{ fontSize: 30, color: '#27ae60' }} />
                                <Text style={{ padding: 5, textDecorationLine: 'underline' }}>Farm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.onVerifierButtonPress()}
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='users' type='FontAwesome' style={{ fontSize: 30, color: '#27ae60' }} />
                                <Text style={{ padding: 5, textDecorationLine: 'underline' }} >Verifier</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.onShipperButtonPress()}
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='truck' type='FontAwesome' style={{ fontSize: 30, color: '#27ae60' }} />
                                <Text style={{ padding: 5, textDecorationLine: 'underline' }}>Shipper</Text>
                            </TouchableOpacity>
                        </View>
                        <Timeline
                            style={{ flex: 1, paddingVertical: 20 }}
                            data={this.state.data}
                            circleSize={25}
                            innerCircle={'dot'}
                            separator
                            circleColor='rgb(45,156,219)'
                            lineColor='rgb(45,156,219)'
                            timeContainerStyle={{ width: 90 }}
                            timeStyle={{ textAlign: 'center', backgroundColor: '#27ae60', color: 'white', padding: 5, borderRadius: 13 }}
                            descriptionStyle={{ color: 'gray' }}
                            options={{
                                style: { paddingTop: 5 }
                            }}
                        />
                    </View>
                </Content>

            </Container>
        );
    }
}

export default ShipmentDetail;