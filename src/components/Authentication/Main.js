import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Button, Icon } from 'native-base';
import { selectRole } from '../../redux/actionCreator';
import { connect } from 'react-redux';

const logo  = require('../../assets/img/logo2.png')
class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { role } = this.props;
        return (
            <Container>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image source={logo} />
                    <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>VI-TRACING</Text>
                </View>
                <Content padder>
                    <Text style={{ alignSelf: 'center', paddingVertical: 10 }}>Welcome!</Text>
                    <Text style={{ alignSelf: 'center', paddingBottom: 20, }}>Let's start logging your package details</Text>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={{ alignSelf: 'center', fontSize: 30, color: '#2f3640', fontWeight: 'bold' }}>Who are you?</Text>
                        <View style={{ paddingVertical: 30 }}>
                            <ListItem>
                                <Left>
                                    <Text>Farmer</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                        onPress={() => this.props.selectRole('farmer')}
                                        color={"#7f8c8d"}
                                        selectedColor={"#5cb85c"}
                                        selected={role.farmer}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Verifier</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                        onPress={() => this.props.selectRole('verifier')}
                                        color={"#7f8c8d"}
                                        selectedColor={"#5cb85c"}
                                        selected={role.verifier}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Shipper</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                        onPress={() => this.props.selectRole('shipper')}
                                        color={"#7f8c8d"}
                                        selectedColor={"#5cb85c"}
                                        selected={role.shipper}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Market</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                        onPress={() => this.props.selectRole('market')}
                                        color={"#7f8c8d"}
                                        selectedColor={"#5cb85c"}
                                        selected={role.market}
                                    />
                                </Right>
                            </ListItem>
                        </View>
                        <Button
                            onPress={() => this.props.navigation.navigate('Login')}
                            block style={{ backgroundColor: '#27ae60', marginTop: 20, marginHorizontal: 10 }}>
                            <Text>Next Step</Text>
                        </Button>
                    </View>
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

export default connect(mapStateToProps, {
    selectRole
})(Authentication);

