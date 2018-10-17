import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import Header from './Header';
import { connect } from 'react-redux';
const logo = require('../assets/img/logo2.png')
const { width, height} = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onScanButtonPress = () => {
        const { userInfo } = this.props;
        switch (userInfo.position) {
            case "Farmer":
                this.props.navigation.navigate('Scan')
                break;
            case "Verifier":
                this.props.navigation.navigate('VerifyScan')
                break;
            case "Shipper":
                this.props.navigation.navigate('ScanShipper')
                break;
            case "Retailer":
                this.props.navigation.navigate('MarketScan')
                break;
            default:
                break;
        }
    }

    onListButtonPress = () => {
        const { userInfo } = this.props;
        switch (userInfo.position) {
            case "Farmer":
                this.props.navigation.navigate('ShipmentListForFarmer')
                break;
            case "Verifier":
                this.props.navigation.navigate('ShipmentListForVerifier')
                break;
            case "Shipper":
                this.props.navigation.navigate('ShipmentListForShipper')
                break;
            case "Retailer":
                this.props.navigation.navigate('ShipmentListForRetailer')
                break;
            default:
                break;
        }
    }

    renderName = () => {
        const { userInfo } = this.props;
        switch (userInfo.position) {
            case "Farmer":
                return 'Farmer'
            case "Verifier":
                return 'Verifier'
            case "Shipper":
                return 'Shipper'
            case "Retailer":
                return 'Retailer'
            default:
                break;
        }
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Header icon={false} navigation={this.props.navigation}/>
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
                                    onPress={() => this.props.navigation.navigate('VerifiedProfile')}
                                    style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='user' type='FontAwesome' style={{ paddingBottom: 5, fontSize: 60, color: '#27ae60' }} />
                                    <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>User Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginRight: 20, paddingBottom: 20 }}>
                                <TouchableOpacity
                                    onPress={() => this.onListButtonPress()}
                                    style={{ paddingLeft: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                    <Icon name='history' type='FontAwesome' style={{ paddingBottom: 5, fontSize: 60, color: '#27ae60' }} />
                                    <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>Shipment Lists</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{ paddingLeft: 20, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='sign-out' type='FontAwesome' style={{ paddingBottom: 5, fontSize: 60, color: '#27ae60' }} />
                                    <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>Sign Out</Text>
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
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#27ae60', 
        height: height * 0.08, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})