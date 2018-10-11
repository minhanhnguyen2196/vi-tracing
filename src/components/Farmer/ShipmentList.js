import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, } from 'react-native';
import { Container, Content, Button, Icon, Text, Card, CardItem, Left, Right, Body, Thumbnail } from 'native-base';

class ShipmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
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
                <Content padder>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left style={{ flex: 2 }}>
                                <Thumbnail source={{ uri: 'https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=' }} />
                                <Body>
                                    <Text>Red Apple</Text>
                                    <Text note>#7764</Text>
                                </Body>
                            </Left>
                            <Right style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ color: '#57606f' }}>Oct 9 2018</Text>
                            </Right>
                        </CardItem>
                       <CardItem>
                           <Left>
                               <Text>QR Code</Text>
                           </Left>
                           <Right>
                               <Text>ABCD12424</Text>
                           </Right>
                       </CardItem>
                       <CardItem>
                           <Left>
                               <Text>Quantity</Text>
                           </Left>
                           <Right>
                               <Text>3000 kilograms</Text>
                           </Right>
                       </CardItem>
                    </Card>

                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left style={{ flex: 2 }}>
                                <Thumbnail source={{ uri: 'https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=' }} />
                                <Body>
                                    <Text>Red Apple</Text>
                                    <Text note>#7764</Text>
                                </Body>
                            </Left>
                            <Right style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ color: '#57606f' }}>Oct 9 2018</Text>
                            </Right>
                        </CardItem>
                       <CardItem>
                           <Left>
                               <Text>QR Code</Text>
                           </Left>
                           <Right>
                               <Text>ABCD12424</Text>
                           </Right>
                       </CardItem>
                       <CardItem>
                           <Left>
                               <Text>Quantity</Text>
                           </Left>
                           <Right>
                               <Text>3000 kilograms</Text>
                           </Right>
                       </CardItem>
                    </Card>

                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left style={{ flex: 2 }}>
                                <Thumbnail source={{ uri: 'https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=' }} />
                                <Body>
                                    <Text>Red Apple</Text>
                                    <Text note>#7764</Text>
                                </Body>
                            </Left>
                            <Right style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ color: '#57606f' }}>Oct 9 2018</Text>
                            </Right>
                        </CardItem>
                       <CardItem>
                           <Left>
                               <Text>QR Code</Text>
                           </Left>
                           <Right>
                               <Text>ABCD12424</Text>
                           </Right>
                       </CardItem>
                       <CardItem>
                           <Left>
                               <Text>Quantity</Text>
                           </Left>
                           <Right>
                               <Text>3000 kilograms</Text>
                           </Right>
                       </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default ShipmentList;