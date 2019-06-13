import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CONSTS, { USER_KEY, USER_DATA } from '../../../helpers/Consts';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { withNavigation } from 'react-navigation';

class DCNItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spinner: false, 
        }; 
    }

    render() {
        return (
            <View style={styles.DCNItemWrapper}>
                <Spinner 
                    visible={this.state.spinner} 
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
                />
                <Text style={styles.DCNItemText}>{this.props.title}</Text>
                <TouchableOpacity
                    style={styles.DCNItemButton}
                    onPress={() => this.props.openDCN(this.props.DcnId)}
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
        fontSize: 17,
        paddingLeft: 10
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
        color: '#fff', 
        marginTop: 'auto', 
        marginBottom: 'auto'
    }
})

// export default DCNItem;
export default withNavigation(DCNItem);