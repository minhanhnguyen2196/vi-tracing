import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native';
import { Container, Content, Button, Icon, Text, Card, CardItem, Left, Right, Body, Thumbnail } from 'native-base';
import { URI } from '../../utils/config';
import Header from '../Header';
var moment = require('moment');

class ShipmentListForFarmer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipmentList: [],
            loading: true
        };
    }

    componentWillMount() {
        const url = URI + '/Shipment';
        const data = { filter: '{"include":"resolve"}' };
        const params = Object.keys(data).map(key => key + '=' +
            encodeURIComponent(data[key])).join('&');
        const fullUrl = url + `${params ? '?' + params : ''}`;

        fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({ shipmentList: resJson, loading: false })
            })
            .catch(err => console.log(err))
    }

    _renderItem = ({ item, index }) => {
        return (
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left style={{ flex: 2 }}>
                        <Thumbnail source={{ uri: 'https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=' }} />
                        <Body>
                            <Text style={{ fontWeight: 'bold', color: '#2C3A47'}}>{item.productName}</Text>
                        </Body>
                    </Left>
                    <Right style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: '#57606f' }}>{moment(item.packedDateTime).format('MMM DD YYYY')}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left style={{ flex: 1}}>
                        <Text>QR Code</Text>
                    </Left>
                    <Right style={{ flex: 2 }}>
                        <Text style={{ fontWeight: 'bold'}}>#{item.qrCode}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left style={{ flex: 1}}>
                        <Text>Quantity</Text>
                    </Left>
                    <Right style={{ flex: 2}}>
                        <Text style={{ fontWeight: 'bold'}}>{item.quantity} kilograms</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }

    render() {
        const { loading } = this.state;
        return (
            <Container style={{ backgroundColor: '#dfe4ea' }}>
                <Header icon={true} navigation={this.props.navigation} />
                <View style={{ margin: 10, flex: 1 }}>
                    {
                        loading && <ActivityIndicator animating color='green' size='large' />
                    }
                    
                    <FlatList
                        data={this.state.shipmentList}
                        renderItem={this._renderItem}
                        removeClippedSubviews
                        keyExtractor={(item, index) => index.toString()}
                        style={{ flex: 1 }}
                    />
                </View>
            </Container>
        );
    }
}

export default ShipmentListForFarmer;