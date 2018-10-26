import React, { Component } from 'react';
import { View, Image, BackHandler, ActivityIndicator } from 'react-native';
import { Container, Content, Left, Right, Body, Icon, Button, Text, Card, CardItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { URI } from '../../utils/config';
import Header from '../Header';
const verify = require('../../assets/img/verifier1.png');

class VerifierOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgInfo: {},
            loading: true
        };
    }

    // componentWillMount = () => {
    //     const { navigation } = this.props;
    //     const verifier = navigation.getParam('verifier');
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
        const verifier = navigation.getParam('verifier');
        return (
            <Container>
                <Header icon={true} navigation={this.props.navigation} />
                <Content padder>
                    {
                        verifier.map((val, key) => (
                            <Card key={key}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={verify} />
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

export default connect(mapStateToProps)(VerifierOrg);


// <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
//     <Image source={verify}
//         style={{ width: 100, height: 100, borderRadius: 50 }} />
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Icon name='check-circle' type='FontAwesome' style={{ color: '#27ae60' }} />
//         <Text style={{ padding: 10, fontSize: 26, fontWeight: 'bold', color: '#130f40' }}>{orgInfo.name}</Text>
//     </View>

//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Icon name='home' type='FontAwesome' />
//         <Text style={{ padding: 5, fontSize: 15 }}>{orgInfo.address}</Text>
//     </View>
// </View>
//     <View style={{ flexDirection: 'row', paddingTop: 30 }}>
//         <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#dfe6e9', marginLeft: 10 }}>
//             <View style={{ paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
//                 <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Org ID</Text>
//                 <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.orgID}</Text>
//             </View>
//             <View style={{ paddingTop: 10 }}>
//                 <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Phone</Text>
//                 <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.phone}</Text>
//             </View>
//         </View>
//         <View style={{ flex: 1, marginRight: 10, paddingBottom: 20 }}>
//             <View style={{ paddingLeft: 20, paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
//                 <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Fax</Text>
//                 <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.fax}</Text>
//             </View>
//             <View style={{ paddingLeft: 20, paddingTop: 10 }}>
//                 <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Email</Text>
//                 <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{orgInfo.email}</Text>
//             </View>
//         </View>
//     </View>