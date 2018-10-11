import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Picker, Icon, Text } from 'native-base';

class InputForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row' }}>
                    <Icon name='leaf' type='FontAwesome' style={{ color: 'white', paddingLeft: 20, paddingRight: 10 }} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>VI-TRACING</Text>
                </View>
                <Content padder>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ paddingLeft: 15 }}>
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#27ae60' }} />
                    </TouchableOpacity>
                    <Text style={{ paddingVertical: 10, paddingBottom: 20, fontSize: 26, color: '#27ae60', fontWeight: 'bold', alignSelf: 'center' }}>Package Details</Text>
                    <Form>
                        <Item floatingLabel style={{ marginBottom: 10 }}>
                            <Label style={{ fontSize: 15 }}>Package Date</Label>
                            <Input value={new Date().toDateString()} editable={false} />
                        </Item>
                        <Item floatingLabel style={{ marginBottom: 10 }}>
                            <Label style={{ fontSize: 15 }}>Quantity(By Kilograms)</Label>
                            <Input keyboardType='numeric' />
                        </Item>
                        <Item picker style={{ marginTop: 20, marginLeft: 15, margin: 10, width: 180 }}>
                            <Label style={{ fontSize: 15 }}>Quality</Label>
                            <Picker
                                mode="dropdown"
                                placeholder="Quality"
                                placeholderStyle={{ color: "#bfc6ea" }}
                            >
                                <Picker.Item label="A" value="A" />
                                <Picker.Item label="B" value="B" />
                                <Picker.Item label="C" value="C" />
                            </Picker>
                        </Item>
                        <Button
                            onPress={() => this.props.navigation.navigate('Submit')}
                            block style={{ backgroundColor: '#27ae60', marginTop: 40, marginHorizontal: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>NEXT STEP</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default InputForm2;