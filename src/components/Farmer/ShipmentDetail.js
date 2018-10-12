import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import Timeline from 'react-native-timeline-listview';

class ShipmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.data = [
            { time: 'Oct 18', title: 'Packed', description: 'Good Apple' },
            { time: 'Jul 27', title: 'Verified', description: 'Qualified product' },
            { time: 'Feb 2', title: 'Shipped', description: 'Shipped from Hanoi' },
            { time: 'Jul 23', title: 'Received', description: 'Good' },

        ]
    }
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#27ae60', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' style={{ fontSize: 32, color: '#ffff', }} />
                    </Button>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Shipment Details</Text>
                    </View>
                </View>
                <Content padder >
                    <View style={{ flex: 1, padding: 5 }}>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='home' type='FontAwesome' style={{ fontSize: 30, color: '#27ae60' }} />
                                <Text style={{ padding: 5, textDecorationLine: 'underline' }}>Farmer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='users' type='FontAwesome' style={{ fontSize: 30, color: '#27ae60' }} />
                                <Text style={{ padding: 5, textDecorationLine: 'underline' }} >Verifier</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='truck' type='FontAwesome' style={{ fontSize: 30, color: '#27ae60' }} />
                                <Text style={{ padding: 5, textDecorationLine: 'underline' }}>Shipper</Text>
                            </TouchableOpacity>
                        </View>
                        <Timeline
                            style={{ flex: 1, }}
                            data={this.data}
                            circleSize={25}
                            innerCircle={'dot'}
                            rowContainerStyle={{ padding: 5 }}
                            separator
                            circleColor='rgb(45,156,219)'
                            lineColor='rgb(45,156,219)'
                            timeContainerStyle={{ width: 120 }}
                            timeStyle={{ textAlign: 'center', backgroundColor: '#27ae60', color: 'white', padding: 5, borderRadius: 13 }}
                            descriptionStyle={{ color: 'gray' }}
                            options={{
                                style: { paddingTop: 5 }
                            }}

                        />
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='cubes' type='FontAwesome' style={{ color: '#27ae60' }} />
                                <Text style={{ padding: 5 }}>3000 kilograms</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='calendar' type='FontAwesome' style={{ color: '#27ae60' }} />
                                <Text style={{ padding: 5 }}>Oct 14 2018</Text>
                            </View>
                        </View>

                    </View>
                </Content>
            </Container>
        );
    }
}

export default ShipmentDetail;