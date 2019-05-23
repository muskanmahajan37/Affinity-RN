import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class CertificationSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render () {
        return (
            <View style={[styles.rowBox, { marginTop: 15, marginBottom: 30 }]}>
                <Text style={styles.boldText}>Certification: </Text>
                <Text style={styles.commonText}>
                    I certify that I have received a copy of the above and have either read it or 
                    it has been read to me and I understand and accept the contents, including 
                    items 1 through 10.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowBox: { flexWrap: 'wrap', flexDirection: 'row' }, 
    boldText: { flexDirection: 'column', fontSize: 16, fontWeight: '600', color: '#000' },
    commonText: { flexDirection: 'column', fontSize: 16, color: '#000' }, 
    inputText: { flexDirection: 'column', fontSize: 16, paddingTop: 0, paddingBottom: 0, paddingLeft: 5, paddingRight: 5, minWidth: 150, borderBottomWidth: 1, borderBottomColor: '#000', height: 25 }, 
});

export default CertificationSection;