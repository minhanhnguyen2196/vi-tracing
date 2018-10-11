import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import Timeline from 'react-native-timeline-listview';

class ShipmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.data = [
            { time: '09:00', title: 'Packed', description: 'Event 1 Description' },
            { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
            { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
            { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
            { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
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
                        <Timeline
                            style={{ flex: 1, }}
                            data={this.data}
                            circleSize={20}
                            circleColor='rgb(45,156,219)'
                            lineColor='rgb(45,156,219)'
                            timeContainerStyle={{ width: 100 }}
                            timeStyle={{ textAlign: 'center', backgroundColor: '#27ae60', color: 'white', padding: 5, borderRadius: 13 }}
                            descriptionStyle={{ color: 'gray' }}
                            options={{
                                style: { paddingTop: 5 }
                            }}
                           
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ShipmentDetail;