import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native';
import { Container, Content, Button, Icon, Text, Card, CardItem, Left, Right, Body, Thumbnail } from 'native-base';

import { URI } from '../../utils/config';
var moment = require('moment');

class ShipmentListForVerifier extends Component {
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
                    <Left style={{ flex: 3 }}>
                        <Thumbnail source={{ uri: 'https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=' }} />
                        <Body>
                            <Text style={{ fontWeight: 'bold' }}>{item.productName}</Text>
                            <Text note>#{item.qrCode}</Text>
                        </Body>
                    </Left>
                    {
                        (item.status !== 'PACKED' && item.status !== 'REJECTED') &&
                        <Right style={{ flex: 1, alignItems: 'center' }}>
                            <Icon name='check-circle' type='FontAwesome' style={{ color: 'green', fontSize: 30 }} />
                        </Right>
                    }

                </CardItem>
                <CardItem>
                    <Left>
                        <Text>Packed Date</Text>
                    </Left>
                    <Right>
                        <Text>{moment(item.packedDateTime).format('MMM DD YYYY')}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>Expired Date</Text>
                    </Left>
                    <Right>
                        <Text>{(item.expiredDateTime) ? moment(item.expiredDateTime).format('MMM DD YYYY') : 'Undefined'}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }

    render() {
        const { loading } = this.state;
        return (
            <Container style={{ backgroundColor: '#dfe4ea' }}>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Shipment List</Text>
                    </View>
                </View>
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

export default ShipmentListForVerifier;