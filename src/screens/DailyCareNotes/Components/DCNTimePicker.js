import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableHighlight, Picker } from 'react-native';

class DCNTimePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false, 
            time : '11',
            itemList: ['01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12pm', '01pm', '02pm', '03pm', '04pm', '05pm', '06pm', '07pm', '08pm', '09pm', '10pm', '11pm', '00am']
        }
    }
    
    render() {
        var list = this.state.itemList;
        var timeArr = [];
        for (var i=0; i<list.length; i++) {
            timeArr.push(
                <Picker.Item key={i} label={list[i]} value={list[i]} />
            );
        }
        return (
            <View style={{}}>
                <Picker 
                    selectedValue={this.state.time}
                    style={{height: 35, width: 120, backgroundColor: 'transparent'}}
                    onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue})}
                    itemStyle={{height: 150}}
                    mode='dialog'
                    prompt={'hello'}
                >
                    { timeArr }
                </Picker>
            </View>
        );
    };
}

export default DCNTimePicker;