import React, { Component } from 'react';
import { View, Image, BackHandler, ActivityIndicator } from 'react-native';
import { Container, Content, Left, Right, Body, Icon, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import Header from '../Header';
import { URI } from '../../utils/config';
const farmer = require('../../assets/img/farmer.jpg');
const shipper = require('../../assets/img/shipper.png');
const verifier = require('../../assets/img/verifier1.png');
const retailer = require('../../assets/img/retailer.png');

class VerifiedProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            loading: true,
        };
    }

    setLogo = () => {
        const { userInfo } = this.props;
        switch (userInfo.position) {
            case 'Farmer':
                this.logo = farmer;
                return this.logo;
                
            case 'Verifier':
                this.logo = verifier
                return this.logo;
            case 'Shipper':
                this.logo = shipper
                return this.logo;
            case 'Retailer':
                this.logo = retailer
                return this.logo;
            default:
                break;
        }
    }

    componentWillMount = () => {
        const { userInfo } = this.props;
        const url = URI + `/${userInfo.position}/` + userInfo.id;
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
                //console.log(resJson);
                this.setState({ loading: false, profile: resJson })
                console.log(this.state.profile)
                // alert('Ok')
            })
            .catch(err => console.log(err))
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
        const { loading, profile } = this.state;
        const { userInfo } = this.props;
        return (
            <Container>
                <Header icon={true} navigation={this.props.navigation} />
                <Content padder>
                    {
                        loading && <ActivityIndicator animating color='green' size='large' />
                    }
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        <Image source={this.setLogo()}
                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='check-circle' type='FontAwesome' style={{ color: '#27ae60' }} />
                            <Text style={{ padding: 10, fontSize: 26, fontWeight: 'bold', color: '#130f40' }}>Mr.{profile.name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='home' type='FontAwesome' />
                            <Text style={{ padding: 5, fontSize: 15 }}>{(profile.org) ? profile.org.name : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 30 }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#dfe6e9', marginLeft: 20 }}>
                            <View style={{ paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>User ID</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{profile.personId}</Text>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Address</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{profile.address}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginRight: 20, paddingBottom: 20 }}>
                            <View style={{ paddingLeft: 20, paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Phone</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{profile.phone}</Text>
                            </View>
                            <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Email</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{profile.email}</Text>
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

export default connect(mapStateToProps)(VerifiedProfile);