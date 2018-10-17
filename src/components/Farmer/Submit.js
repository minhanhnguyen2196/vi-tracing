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
import Header from '../Header';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { URI } from '../../utils/config';
const logo = require('../../assets/img/logo2.png')
class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            submitted: false
        };
    }

    shipmentPacked = () => {
        const { packageDetail, userInfo } = this.props;
        let packedShipment = {
            "$class": "com.vsii.blockchain.vitracing.ShipmentPacked",
            "productName": packageDetail.productName,
            "note": packageDetail.descr,
            "quantity": packageDetail.quantity,
            "qrCode": packageDetail.qrCode,
            "farmerId": userInfo.id
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
                    this.setState({ visible: false, submitted: true });
                    this.props.navigation.navigate('SubmitResult');
                })
                .catch(err => console.log(err))
        })
    }

    render() {
        const { packageDetail, shipment } = this.props;
        return (
            <Container style={{ backgroundColor: '#F1F3F4' }} >
                <Header icon={true} navigation={this.props.navigation} />
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
                                        <Text note>#{packageDetail.qrCode}</Text>
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
                                    <Text>{packageDetail.productName}</Text>
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
                        <Button
                            onPress={() => this.shipmentPacked()}
                            block style={{ backgroundColor: '#27ae60', marginTop: 20 }} >
                            <Text>
                                SUBMIT PERMANENTLY
                            </Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        packageDetail: state.packageDetail,
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps)(Submit);