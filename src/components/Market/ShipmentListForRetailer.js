import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, BackHandler, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text, Card, CardItem, Left, Right, Body, Thumbnail } from 'native-base';
import Header from '../Header';
import { URI } from '../../utils/config';
var moment = require('moment');

class ShipmentListForRetailer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipmentList: [],
            loading: true
        };
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
                            <Text style={{ fontWeight: 'bold', color: '#1e272e' }}>{item.productName}</Text>
                            <Text note>#{item.qrCode}</Text>
                        </Body>
                    </Left>
                    {
                        (item.status !== 'PACKED' && item.status !== 'REJECTED') &&
                        <Right style={{ flex: 1, alignItems: 'center', }}>
                            <Icon name='check-circle' type='FontAwesome' style={{ color: 'green', fontSize: 30 }} />
                        </Right>
                    }
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>Quantity</Text>
                    </Left>
                    <Right>
                        <Text style={{ fontWeight: 'bold' }}>{item.quantity} kilograms</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>Expired Date</Text>
                    </Left>
                    <Right>
                        <Text style={{ fontWeight: 'bold' }}>{(item.expiredDateTime) ? moment(item.expiredDateTime).format('MMM DD YYYY') : 'Undefined'} </Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left style={{ flex: 1}}/>
                    <Right>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('ShipmentDetail', { shipment: item })}
                        style={{ alignItems: 'center'}}>
                            <Text style={{ color: '#2980b9', fontSize: 15}}>VIEW DETAILS</Text>
                        </TouchableOpacity>
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

export default ShipmentListForRetailer;


{/* <CardItem>
    <Left>
        <Text>Farmer Org</Text>
    </Left>
    <Right>
        <Text style={{ fontWeight: 'bold' }}>{(item.farmer) ? item.farmer.org.name : 'Undefined'}</Text>
    </Right>
</CardItem>
    <CardItem>
        <Left>
            <Text>Verifier Org</Text>
        </Left>
        <Right>
            <Text style={{ fontWeight: 'bold' }}>{(item.verifier) ? item.verifier.org.name : 'Undefined'}</Text>
        </Right>
    </CardItem>
    <CardItem>
        <Left>
            <Text>Shipper Org</Text>
        </Left>
        <Right>
            <Text style={{ fontWeight: 'bold' }}>{(item.shipper) ? item.shipper.org.name : 'Undefined'}</Text>
        </Right>
    </CardItem> */}