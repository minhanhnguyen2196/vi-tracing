import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';
const { width, height } = Dimensions.get('window');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.header}>
                {
                    this.props.icon &&
                    <TouchableOpacity
                        hitSlop={{ top: 30, bottom: 20, left: 20, right: 20 }}
                        style={{ padding: 10, position: 'absolute', left: 10, top: 10, bottom: 10, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </TouchableOpacity>
                }
                <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5, alignSelf: 'center' }}>VI-TRACING</Text>
            </View>
        );
    }
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: height * 0.1,
        backgroundColor: '#27ae60',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})