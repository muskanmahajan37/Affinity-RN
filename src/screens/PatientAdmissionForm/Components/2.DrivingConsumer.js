import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

class DrivingConsumerSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render () {
        return (
            <View style={{ marginTop: 15 }}>
                <View style={styles.rowBox}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>2. Driving Consumer is NOT allowed </Text>
                </View>
                <View style={styles.rowBox}>
                    <View style={[styles.boldText, styles.dot]}></View>
                    <Text style={[styles.commonText, {marginLeft: 40}]}> Caregiver/Contractor (CNA/HHA/Companion/Homemaker) is NOT ALLOWED to drive the cusumer. </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowBox: { flexWrap: 'wrap', flexDirection: 'row' }, 
    boldText: { flexDirection: 'column', fontSize: 16, fontWeight: '600', color: '#000', borderBottomWidth: 1, borderColor: '#000' },
    commonText: { flexDirection: 'column', fontSize: 16, color: '#000' }, 
    inputText: { flexDirection: 'column', fontSize: 16, paddingTop: 0, paddingBottom: 0, paddingLeft: 5, paddingRight: 5, minWidth: 150, borderBottomWidth: 1, borderBottomColor: '#000', height: 25 }, 
    dot: { position: 'absolute', flexDirection: 'row', width: 7, height: 7, backgroundColor: '#000', 
            borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30 
    }, 
});

export default DrivingConsumerSection;