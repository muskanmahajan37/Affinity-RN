import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class AuthToReleaseSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render () {
        return (
            <View style={{ marginTop: 15 }}>
                <View style={styles.rowBox}>
                    <Text style={styles.boldText}>9. Authorization to release and/or receive information: </Text>
                    <Text style={styles.commonText}>
                        I hereby authorize Affinity Home Care to release and/or receive any past and/or current health, 
                        insurance or any other information necessary to determine benefits as may be necessary for the 
                        coordination or continuation of my care to other service providers and to all third party payers 
                        as required to receive payment and for Quality Assurance Activities.
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

export default AuthToReleaseSection;