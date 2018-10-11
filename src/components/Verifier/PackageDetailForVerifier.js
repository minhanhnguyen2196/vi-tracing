import React, { Component } from 'react';
import { View, Image, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';

var moment = require('moment');
const logo  = require('../../assets/img/logo2.png')
class PackageDetailForVerifier extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
    render() {
        const { shipment } = this.props;
        return (
            <Container>
                <Content padder>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#27ae60' }} />
                    </Button>
                    <Text style={{ alignSelf: 'center', fontSize: 16, paddingVertical: 20, fontWeight: 'bold', color: '#27ae60' }}>Scan Successfull!</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <Image source={{ uri: 'https://www.yatescidermill.com/wp-content/uploads/2016/08/granny-smith.png' }}
                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='check-circle' type='FontAwesome' style={{ color: '#27ae60' }} />
                            <Text style={{ padding: 10, fontSize: 26, fontWeight: 'bold', color: '#130f40' }}>{shipment.productName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='home' type='FontAwesome' />
                            <Text style={{ padding: 5, fontSize: 15 }}>{shipment.farmer.orgFarmer.name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 30 }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#dfe6e9', marginLeft: 20 }}>
                            <View style={{ paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Package ID</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>#{shipment.qrCode}</Text>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Description</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{shipment.notes}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginRight: 20, paddingBottom: 20 }}>
                            <View style={{ paddingLeft: 20, paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Quantity</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{shipment.quantity} kilograms</Text>
                            </View>
                            <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Packaged Date</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{moment(shipment.packedDateTime).format('MMM DD YYYY')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('VerifyForm')}
                            style={{ backgroundColor: '#27ae60', marginTop: 40, marginHorizontal: 10 }} block>
                            <Text style={{ color: 'white', fontSize: 15 }}>NEXT STEP</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}


function mapStateToProps(state) {
    return {
        shipment: state.shipment
    };
}

export default connect(mapStateToProps)(PackageDetailForVerifier);