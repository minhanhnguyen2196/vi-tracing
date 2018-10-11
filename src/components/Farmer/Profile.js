import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Content, Icon, Button, Left, Right, Text } from 'native-base';

const logo = require('../../assets/img/logo2.png');
const farmer = require('../../assets/img/farmer.jpg');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <View style={styles.header}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={styles.logoContainer}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>User Profile</Text>
                    </View>
                </View>
                <Content padder>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        <Image source={farmer}
                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ padding: 10, fontSize: 26, fontWeight: 'bold', color: '#130f40' }}>Nguyen Van A</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='home' type='FontAwesome' />
                            <Text style={{ padding: 5, fontSize: 15 }}>Thai Binh Farm</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 30 }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#dfe6e9', marginLeft: 20 }}>
                            <View style={{ paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>ID</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>2132131</Text>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5, }}>Phone Number</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>093213111</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginRight: 20, paddingBottom: 20 }}>
                            <View style={{ paddingLeft: 20, paddingBottom: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Address</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>Thai Binh</Text>
                            </View>
                            <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#555D65', paddingBottom: 5 }}>Description</Text>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>Good Farmer</Text>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#27ae60',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: '#2d3436',
        paddingVertical: 10,
        paddingLeft: 15,
        fontSize: 15
    },
})