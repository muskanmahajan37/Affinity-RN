import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class ConsentForTreatmentSection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render () {
        return (
            <View style={{marginTop: 15}}>
                <View style={styles.rowBox}>
                    <Text style={styles.boldText}>1. Consent for Treatment: </Text>
                </View>
                <View style={styles.rowBox}>
                    <Text style={styles.commonText}>I </Text>
                    <TextInput style={[styles.inputText, {width: 250}]} maxLength={25} />
                    <Text style={styles.commonText}>, hereby authorize Affinity Home Care and its agents</Text>
                    <Text style={styles.commonText}> to provide me with care, treatment and procedures and required by me or my legal representative, as it pertains to home care.</Text>
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
});

export default ConsentForTreatmentSection;