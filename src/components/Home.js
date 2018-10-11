import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
const logo = require('../assets/img/logo2.png')
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onScanButtonPress = () => {
        const { role } = this.props;
        if (role.farmer) {
            this.props.navigation.navigate('Scan');
        } else if (role.verifier) {
            this.props.navigation.navigate('VerifyScan');
        } else if (role.market) {
            this.props.navigation.navigate('MarketScan');
        } else if (role.shipper) {
            this.props.navigation.navigate('ScanShipper')
        }
    }

    renderName = () => {
        const { role } = this.props;
        if (role.farmer) {
            return 'Farmer'
        } else if (role.verifier) {
            return 'Verifier'
        } else if (role.market) {
            return 'Market'
        } else if (role.shipper) {
            return 'Shipper'
        }
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={logo} />
                    <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>VI-TRACING</Text>
                </View>
                <Content padder contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '50%' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 26, color: '#2f3640', fontWeight: 'bold' }}>
                            Welcome back, Mr.{this.renderName()}
                        </Text>
                    </View>

                    <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#dfe6e9', }}>
                                <TouchableOpacity
                                    onPress={() => this.onScanButtonPress()}
                                    style={{ paddingBottom: 20, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                    <Icon name='qrcode' type='FontAwesome' style={{ paddingBottom: 5, fontSize: 60, color: '#27ae60' }} />
                                    <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>Scan QR Code</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Profile')}
                                    style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='user' type='FontAwesome' style={{ paddingBottom: 5, fontSize: 60, color: '#27ae60' }} />
                                    <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>User Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginRight: 20, paddingBottom: 20 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ShipmentList')}
                                    style={{ paddingLeft: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                    <Icon name='history' type='FontAwesome' style={{ paddingBottom: 5, fontSize: 60, color: '#27ae60' }} />
                                    <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>Shipment Lists</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingLeft: 20, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='question-circle' type='FontAwesome' style={{ paddingBottom: 5, fontSize: 60, color: '#27ae60' }} />
                                    <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>Help</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }
}


function mapStateToProps(state) {
    return {
        role: state.role
    };
}

export default connect(mapStateToProps)(Home);