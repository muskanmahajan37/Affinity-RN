import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

class DCNWeekItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekIndex: this.props.weekIndex,
            week: this.props.week,
        }; 
    }

    render() {
        var week = this.state.week;
        var textArr = [];
        for (var i = 0; i < week.length; i++) {
            textArr.push(<View key = {i}>
                            <Text style={{color: '#000', fontSize: 18, fontWeight: '400', paddingTop: 5, textAlign: 'center'}}>{week[i]}</Text>
                        </View>);
        }

        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 40, paddingRight: 40}}>
                {textArr}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    itemContainer: {color: '#000', width: '100%', flex: 8, flexDirection: 'row', paddingLeft: 50, paddingRight: 50},
    itemTextWrapper: {color: '#000', flex: 7, flexDirection: 'row'},
    itemText: {color: '#000', flex: 1, flexDirection: 'row'}
});

export default DCNWeekItem;