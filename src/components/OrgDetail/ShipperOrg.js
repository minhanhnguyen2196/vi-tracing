import React, { Component } from 'react';
import { View, Image, BackHandler, ActivityIndicator } from 'react-native';
import { Container, Content, Left, Right, Body, Icon, Button, Text, Card, CardItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { URI } from '../../utils/config';
import Header from '../Header';
const ship = require('../../assets/img/shipper.png');

class ShipperOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgInfo: {},
            loading: true
        };
    }

    // componentWillMount = () => {
    //     const { navigation } = this.props;
    //     const id = navigation.getParam('id');
    //     const url = URI + '/Orgnization/' + id;
    //     fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(resJson => {
    //             this.setState({ orgInfo: resJson, loading: false })
    //         })
    //         .catch(err => console.log(err))
    // }

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    // }
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    // }
    // handleBackPress = () => {
    //     this.props.navigation.navigate('Home');
    //     return true;
    // }
    render() {
        const { navigation } = this.props;
        const shipper = navigation.getParam('shipper');
        return (
            <Container>
                <Header icon={true} navigation={this.props.navigation} />
                <Content padder>
                    {
                        shipper.map((val, key) => (
                            <Card key={key}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={ship} />
                                        <Body>
                                            <Text>{val.name}</Text>
                                            <Text note>{val.org.name}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem bordered>
                                    <Text style={{ fontSize: 15, color: '#555D65', paddingBottom: 5, flex: 2 }}>User ID</Text>
                                    <Right style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{val.personId}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem bordered>
                                    <Text style={{ fontSize: 15, color: '#555D65', paddingBottom: 5, flex: 2 }}>Phone Number</Text>
                                    <Right style={{ flex: 2 }}>
                                        <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{val.phone}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem bordered>
                                    <Text style={{ fontSize: 15, color: '#555D65', paddingBottom: 5, flex: 1 }}>Address</Text>
                                    <Right style={{ flex: 2 }}>
                                        <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{val.address}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Text style={{ fontSize: 15, color: '#555D65', paddingBottom: 5, flex: 1 }}>Email</Text>
                                    <Right style={{ flex: 2 }}>
                                        <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{val.email}</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        ))
                    }
                </Content>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        shipment: state.shipment,
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps)(ShipperOrg);