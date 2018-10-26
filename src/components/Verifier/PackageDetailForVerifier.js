import React, { Component } from 'react';
import { View, Image, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Content, Button, Icon, Text, Card, CardItem, Left, Right, Body, Header } from 'native-base';
import { connect } from 'react-redux';

var moment = require('moment');
const apple = require('../../assets/img/apple.png')
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
        let notesArray = shipment.notesFarmer.split('_');
        let note = notesArray.map((val, key) => {

            if (notesArray.length === key + 1) {
                return (
                    <View key={key} >
                        <Text style={{ padding: 4 }}>{val}</Text>
                    </View>
                )
            } else return (
                <View key={key} style={{ borderBottomColor: 'grey', borderBottomWidth: 0.4 }}>
                    <Text style={{ padding: 4 }}>{val}</Text>
                </View>
            )
        })
        let noteString = notesArray.join("\n")
        return (
            <Container>
                <Content padder>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Left style={{ flex: 1 }}>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <Icon name='arrow-back' style={{ fontSize: 32, color: '#27ae60' }} />
                            </Button>
                        </Left>
                        <Body style={{ flex: 2 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#27ae60' }}>Scan Successful !</Text>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Image source={apple}
                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='check-circle' type='FontAwesome' style={{ color: '#27ae60' }} />
                            <Text style={{ padding: 10, fontSize: 26, fontWeight: 'bold', color: '#130f40' }}>{shipment.productName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='home' type='FontAwesome' />
                            <Text style={{ padding: 5, fontSize: 15 }}>{shipment.farmer.org.name}</Text>
                        </View>
                    </View>
                    <Card transparent>
                        <CardItem bordered>
                            <Text style={{ flex: 1, fontWeight: '400' }}>
                                Package ID
                                </Text>
                            <Right style={{ flex: 1 }}>
                                <Text style={{ fontWeight: '400' }}>{shipment.qrCode}</Text>
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                            <Text style={{ flex: 3, fontWeight: '400' }}>
                                Quantity
                                </Text>
                            <Right style={{ flex: 2 }}>
                                <Text style={{ fontWeight: '400' }}>{shipment.quantity} kilograms</Text>
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                            <Text style={{ flex: 3, fontWeight: '400' }}>
                                Packaged Date
                                </Text>
                            <Right style={{ flex: 2 }}>
                                <Text style={{ fontWeight: '400' }}>{moment(shipment.packedDateTime).format('MMM DD YYYY')}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={{ flex: 2, fontWeight: '400' }}>
                                Description
                            </Text>
                        </CardItem>
                        <View style={{ marginHorizontal: 15 }}>
                            {note}
                        </View>
                    </Card>

                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('VerifyForm')}
                            style={{ backgroundColor: '#27ae60', marginTop: 10, marginHorizontal: 10 }} block>
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



{/* <View style={{ flexDirection: 'row', paddingTop: 30 }}>
    <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#dfe6e9', marginLeft: 10 }}>
        <View style={{ paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
            <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Package ID</Text>
            <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{shipment.qrCode}</Text>
        </View>
        <View style={{ paddingTop: 10 }}>
            <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Description</Text>
            <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{noteString}</Text>
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
</View> */}