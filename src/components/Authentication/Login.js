import React, { Component } from 'react';
import { View, Alert, KeyboardAvoidingView, TouchableOpacity, Animated, TextInput } from 'react-native';
import { Container, Input, Item, Label, Text, Button, Icon, Form, Content, Picker, Left, Header } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { getUserInfo } from '../../redux/actionCreator';
var md5 = require('md5');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            visible: false
        };
    }

    componentWillMount() {
        this.backIconLeft = new Animated.Value(20);
    }

    hideBackIcon = () => {
        Animated.timing(this.backIconLeft, {
            toValue: -100,
            duration: 500
        }).start()
    }
    showBackIcon = () => {
        Animated.timing(this.backIconLeft, {
            toValue: 20,
            duration: 500
        }).start()
    }

    logIn = () => {
        const { username, password } = this.state;
        let userAccount = {
            username,
            password: md5(password)
        }
        if (username === '' || password === '') {
            alert('Undefined username or password')
        } else {
            this.setState({ visible: true }, () => {
                fetch('http://192.168.0.87:7777/api/userlogin/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userAccount)
                })
                    .then((res) => {
                        console.log(res.status);
                        if (res.status == 404) {
                            Alert.alert(
                                'Login Failed',
                                'Incorrect Username or Password',
                                [
                                    { text: 'Try Again', onPress: () => this.setState({ visible: false}) },
                                ],
                                { cancelable: true }
                            );
                            return Promise.reject(new Error());
                        } else {
                            return res.json();
                        }
                    })
                    .then(resJson => {
                        this.props.getUserInfo(resJson);
                        this.setState({ visible: false }, () => {
                            Alert.alert(
                                'Login Successfull',
                                'Your credentials are OK',
                                [
                                    { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
                                ],
                                { cancelable: false }
                            )
                        });
                    })
                    .catch(err => console.log(err))
            })
        }
    }


    render() {
        return (
            <Container style={{ flex: 1, }}>
                <Animated.View style={{
                    position: 'absolute',
                    top: 40,
                    left: this.backIconLeft,
                    zIndex: 100
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 36 }} />
                    </TouchableOpacity>
                </Animated.View>
                <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                    <Spinner
                        color='#27ae60'
                        visible={this.state.visible}
                        animation='fade'
                    />
                    <Animatable.Text
                        animation='fadeInDown'
                        style={{
                            color: '#27ae60',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 26,
                            marginTop: 10
                        }}
                    >
                        Sign In
                    </Animatable.Text>
                    <Animatable.View
                        animation='slideInUp'
                    >
                        <Form>
                            <Item style={{ marginVertical: 10, paddingVertical: 5, marginHorizontal: 20 }}>
                                <Icon active name='person' style={{ color: '#27ae60' }} />
                                <Input
                                    getRef={(input) => this.username = input}
                                    onSubmitEditing={(event) => this.refs.password._root.focus()}
                                    onEndEditing={() => this.showBackIcon()}
                                    onFocus={() => this.hideBackIcon()}
                                    placeholder='Username'
                                    underlineColorAndroid='transparent'
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ username: text })}
                                />
                            </Item>
                            <Item style={{ marginVertical: 10, paddingVertical: 5, marginHorizontal: 20 }}>
                                <Icon active name='lock' style={{ color: '#27ae60' }} />
                                <Input
                                    ref='password'
                                    secureTextEntry={true}
                                    onEndEditing={() => this.showBackIcon()}
                                    onFocus={() => this.hideBackIcon()}
                                    placeholder='Password'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </Item>

                            <Button
                                onPress={() => this.logIn()}
                                full block style={{ backgroundColor: '#27ae60', marginTop: 20, marginHorizontal: 15 }}>
                                <Text style={{ color: 'white' }}>Login</Text>
                            </Button>
                            <TouchableOpacity style={{ flexWrap: 'wrap' }}>
                                <Text style={{ alignSelf: 'flex-end', fontSize: 14, paddingRight: 10, paddingTop: 20 }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </Form>
                    </Animatable.View>

                    <Animated.View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: this.backIconLeft,
                        right: 0,
                        left: 0
                    }}
                    >
                        <TouchableOpacity>
                            <Text style={{ fontSize: 14, }}>Don't have an account?
                                <Text style={{ color: '#27ae60', fontSize: 14 }}> Register now!</Text>
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        role: state.role
    };
}

export default connect(mapStateToProps, { getUserInfo })(Login);