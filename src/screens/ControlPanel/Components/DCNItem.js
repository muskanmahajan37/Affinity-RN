import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class DCNItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        }; 
    }

    render() {
        return (
            <View style={styles.DCNItemWrapper}>
                <Text style={styles.DCNItemText}>Smith_Mary_2019_4_27 {this.props.title}</Text>
                <TouchableOpacity
                    style={styles.DCNItemButton}
                >
                    <Text style={styles.DCNItemButtonText}>{this.props.btnTitle}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    DCNItemWrapper: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2,
        padding: 2
    },
    DCNItemText: {
        flex: 3,
        color: '#000',
        fontSize: 17
    },
    DCNItemButton: {
        flex: 1,
        backgroundColor: '#0136ff',
        borderRadius: 8,
        height: 25
    },
    DCNItemButtonText: {
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        color: '#fff'
    }
})

export default DCNItem;