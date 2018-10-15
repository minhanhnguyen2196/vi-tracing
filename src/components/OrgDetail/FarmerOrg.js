import React, { Component } from 'react';
import { View, Image, BackHandler, ActivityIndicator } from 'react-native';
import { Container, Content, Left, Right, Body, Icon, Button, Header, Text } from 'native-base';
import { connect } from 'react-redux';
import { URI } from '../../utils/config';
const farm = require('../../assets/img/farm.png');

class FarmerOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgInfo: {},
            loading: true
        };
    }

    componentWillMount = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        const url = URI + '/Orgnization/' + id;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({ orgInfo: resJson, loading: false })
            })
            .catch(err => console.log(err))
    }

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
        const { loading, orgInfo } = this.state;
        // const { shipment } = this.props;
        return (
            <Container>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Organization Details</Text>
                    </View>
                </View>
                <Content padder>
                    {
                        loading && <ActivityIndicator animating color='green' size='large' />
                    }
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        <Image source={farm}
                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='check-circle' type='FontAwesome' style={{ color: '#27ae60' }} />
                            <Text style={{ padding: 10, fontSize: 26, fontWeight: 'bold', color: '#130f40' }}>{orgInfo.name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='home' type='FontAwesome' />
                            <Text style={{ padding: 5, fontSize: 15 }}>{orgInfo.address}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 30 }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#dfe6e9', marginLeft: 10 }}>
                            <View style={{ paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Org ID</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.orgID}</Text>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Phone</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.phone}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginRight: 10, paddingBottom: 20 }}>
                            <View style={{ paddingLeft: 20, paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Fax</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.fax}</Text>
                            </View>
                            <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Email</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.email}</Text>
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
        shipment: state.shipment,
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps)(FarmerOrg);