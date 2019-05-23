import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class PlanOfTreatmentSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render () {
        return (
            <View style={{ marginTop: 15 }}>
                <View style={styles.rowBox}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>6. Plan of Treatment </Text>
                </View>
                <View style={styles.rowBox}>
                    <Text style={[styles.commonText, { marginLeft: 20 }]}>The patient's family caregiver or guardian must be informed by the home health care provider that:</Text>
                </View>
                <View style={styles.rowBox}>
                    <View style={[styles.boldText, styles.dot]}></View>
                    <Text style={[styles.commonText, { marginLeft: 40 }]}>
                        He/She has the right to be informed of the plan of treatment
                    </Text>
                </View>
                <View style={styles.rowBox}>
                    <View style={[styles.boldText, styles.dot]}></View>
                    <Text style={[styles.commonText, { marginLeft: 40 }]}>
                        He/She has the right to participate in the development of the plan of treatment
                    </Text>
                </View>
                <View style={styles.rowBox}>
                    <View style={[styles.boldText, styles.dot]}></View>
                    <Text style={[styles.commonText, { marginLeft: 40 }]}>
                        He/She may have a copy of the plan if requested
                    </Text>
                </View>
                <View style={styles.rowBox}>
                    <View style={[styles.boldText, styles.dot]}></View>
                    <Text style={[styles.commonText, { marginLeft: 40 }]}>
                        The caregiver being referred is an independent contractor of the registry
                    </Text>
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
    miniCheckbox: {width: 15, height: 15, top: 4}, 
});

export default PlanOfTreatmentSection;