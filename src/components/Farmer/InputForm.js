import React, { Component } from 'react';
import { View, Alert, Image,  TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Picker, Icon, Text } from 'native-base';
import { setQuantity, setProductName, setDescription } from '../../redux/actionCreator';
import { connect } from 'react-redux';

const logo  = require('../../assets/img/logo2.png')
class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused1: false,
            isFocused2: false,
            isFocused3: false,
        };
    }

    onButtonPress = () => {
        const { packageDetail} = this.props;
        if (packageDetail.productType == "" || packageDetail.quantity == 0) {
            Alert.alert(
                'Warning',
                'Please fill all the required fields',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
              )
        } else {
            this.props.navigation.navigate('Submit')
        }
    }

    render() {
        const { packageDetail } = this.props;
        return (
            <Container style={{ flex: 1 }}  >
                <View style={styles.header}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={styles.logoContainer}>
                        <Image source={logo} />
                        <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>VI-TRACING</Text>
                    </View>
                </View>
                <Content padder>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior='position'>
                        <Text style={{ paddingVertical: 10, fontSize: 24, color: '#27ae60', fontWeight: 'bold', alignSelf: 'center' }}>Shipment Details</Text>
                        <View>
                            <Text style={styles.label}>Packaged Date</Text>
                            <TextInput
                                style={styles.input}
                                value={new Date().toDateString()}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Product Name</Text>
                            <TextInput
                                onBlur={() => this.setState({ isFocused1: false })}
                                onFocus={() => this.setState({ isFocused1: true })}
                                style={this.state.isFocused1 ? styles.focusInput : styles.input}
                                onChangeText={(text) => this.props.setProductName(text)}
                                onSubmitEditing={() => this.quantity.focus()}
                                ref={(input) => this.type = input}
                                underlineColorAndroid='transparent'

                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Quantity</Text>
                            <TextInput
                                keyboardType='numeric'
                                onBlur={() => this.setState({ isFocused2: false })}
                                onFocus={() => this.setState({ isFocused2: true })}
                                style={this.state.isFocused2 ? styles.focusInput : styles.input}
                                ref={(input) => this.quantity = input}
                                onSubmitEditing={() => this.desc.focus()}
                                onChangeText={(text) => this.props.setQuantity(text)}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                ref={(input) => this.desc = input}
                                onBlur={() => this.setState({ isFocused3: false })}
                                onFocus={() => this.setState({ isFocused3: true })}
                                style={this.state.isFocused3 ? styles.focusInput : styles.input}
                                onChangeText={(text) => this.props.setDescription(text)}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <Button
                            onPress={() => this.onButtonPress()}
                            block style={styles.btn}>
                            <Text style={{ color: 'white', fontSize: 16 }}>NEXT STEP</Text>
                        </Button>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        packageDetail: state.packageDetail
    };
}

export default connect(mapStateToProps, {
    setQuantity,
    setProductName,
    setDescription
})(InputForm);


const styles = StyleSheet.create({
    input: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingLeft: 20,
        alignSelf: 'center',
        width: '90%',
        height: 45,
        borderRadius: 5,
        borderColor: '#95a5a6',
        borderWidth: 0.5
    },
    focusInput: {
        color: 'black',
        backgroundColor: '#FBFBFC',
        fontSize: 18,
        paddingLeft: 20,
        alignSelf: 'center',
        width: '90%',
        height: 45,
        borderRadius: 5,
        borderColor: '#27ae60',
        borderWidth: 1
    },
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
    btn: {
        backgroundColor: '#27ae60', 
        marginTop: 40, 
        marginHorizontal: 15
    }
})

{/* <Item fixedLabel style={{ marginBottom: 10 }}>
    <Label style={{ flex: 2 }}>Package Date</Label>
    <Input
        style={{ flex: 3 }}
        value={new Date().toDateString()}
        editable={false} />
</Item>
    <Item fixedLabel style={{ marginBottom: 10 }}>
        <Label style={{ flex: 2 }}>Product Type</Label>
        <Input
            style={{ flex: 3 }}
            onChangeText={(text) => this.props.setProductType(text)}
            blurOnSubmit={false}
            onSubmitEditing={(event) => this.refs.quantity._root.focus()}
            ref={(input) => this.name = input}
        />
    </Item>
    <Item fixedLabel style={{ marginBottom: 10 }}>
        <Label style={{ flex: 2 }}>Quantity</Label>
        <Input
            style={{ flex: 3 }}
            onChangeText={(text) => this.props.setQuantity(text)}
            keyboardType='numeric'
            ref='quantity'
            onSubmitEditing={(event) => this.refs.desc._root.focus()}
        />
    </Item>
    <Item fixedLabel style={{ marginBottom: 10 }} last>
        <Label style={{ flex: 2 }}>Description</Label>
        <Input
            style={{ flex: 3 }}
            onChangeText={(text) => this.props.setDescription(text)}
            ref='desc' />
    </Item> */}