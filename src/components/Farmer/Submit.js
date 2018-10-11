import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
    Container,
    Content,
    Icon,
    Button,
    Text,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Right,
    Body
} from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { URI } from '../../utils/config';
const logo  = require('../../assets/img/logo2.png')
class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            submitted: false
        };
    }

    shipmentPacked = () => {
        const { packageDetail, shipment } = this.props;
        let packedShipment = {
            "$class": "com.vsii.blockchain.vitracing.ShipmentPacked",
            "productName": packageDetail.productType,
            "note": packageDetail.descr,
            "quantity": packageDetail.quantity,
            "qrCode":  shipment.qrCode,
            "farmerId": "resource:com.vsii.blockchain.vitracing.Farmer#" + shipment.farmer.personId
        }
        this.setState({ visible: true }, () => {
            return fetch(URI + '/ShipmentPacked', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(packedShipment)
            })
                .then(res => res.json())
                .then(resJson => {
                    console.log(resJson);
                    this.setState({ visible: false, submitted: true});
                })
                .catch(err => console.log(err))
        })
    }

    render() {
        const { packageDetail, shipment } = this.props;
        return (
            <Container style={{ backgroundColor: '#F1F3F4' }} >
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={logo} />
                        <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>VI-TRACING</Text>
                    </View>
                </View>
                <Content padder>
                    <Spinner
                        color='#27ae60'
                        visible={this.state.visible}
                        animation='slide'
                    />
                    <Text style={{ alignSelf: 'center', padding: 5, paddingTop: 10 }}>
                        We are storing your data in a secure way. Because of this, once you
                        <Text style={{ color: '#27ae60' }}> Submit </Text>
                        , you will
                      <Text style={{ color: 'red' }}> NOT </Text>
                        be able to go back and edit the information
                    </Text>
                    <Text style={{ alignSelf: 'center', padding: 5 }}>
                        Please double-check your package details below and hit
                        <Text style={{ color: '#27ae60' }}> Submit </Text>
                    </Text>
                    <View style={{ paddingVertical: 20 }}>
                        <Card>
                            <CardItem >
                                <Left>
                                    <Body>
                                        <Text>Package ID</Text>
                                        <Text note>#{shipment.qrCode}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Image source={{ uri: 'https://media.istockphoto.com/photos/granny-smith-apple-background-picture-id478157670?k=6&m=478157670&s=612x612&w=0&h=-i0PhrDggWPvhh4KbH7ge17s-YPQSo4-vwqD_xV-etg=' }} style={{ height: 200, width: '100%', flex: 1 }} />
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Text style={{ flex: 3 }}>
                                    Product Name
                                </Text>
                                <Right style={{ flex: 2 }}>
                                    <Text>{packageDetail.productType}</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Text style={{ flex: 3 }}>
                                    Quantity
                                </Text>
                                <Right style={{ flex: 2 }}>
                                    <Text>{packageDetail.quantity} kilograms</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Text style={{ flex: 3 }}>
                                    Packaged Date
                                </Text>
                                <Right style={{ flex: 2 }}>
                                    <Text>{new Date().toDateString()}</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Text style={{ flex: 3 }}>
                                    Description
                                </Text>
                                <Right style={{ flex: 2 }}>
                                    <Text>{packageDetail.descr}</Text>
                                </Right>
                            </CardItem>
                        </Card>
                        {
                            (this.state.submitted) ?
                                <View>
                                    <Button
                                        onPress={() => this.props.navigation.navigate('Scan')}
                                        block style={{ backgroundColor: '#27ae60', marginTop: 20 }} >
                                        <Text>
                                            NEW PACKAGE
                                    </Text>
                                    </Button>
                                    <Button
                                        onPress={() => this.props.navigation.navigate('Home')}
                                        block style={{ backgroundColor: '#2980b9', marginTop: 20 }} >
                                        <Text>
                                            BACK TO HOME
                                    </Text>
                                    </Button>
                                </View>

                                : <Button
                                    onPress={() => this.shipmentPacked()}
                                    block style={{ backgroundColor: '#27ae60', marginTop: 20 }} >
                                    <Text>
                                        SUBMIT PERMANENTLY
                                    </Text>
                                </Button>
                        }

                    </View>
                </Content>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        packageDetail: state.packageDetail,
        shipment: state.shipment
    };
}

export default connect(mapStateToProps)(Submit);