import React from 'react';
import { ScrollView, View, Image, Text, TextInput, 
    TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CONSTS, { USER_KEY, USER_DATA } from '../../helpers/Consts';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            firstname: '',
            lastname: '',
            ssn: '',
            randomPassCode: '',
            passCodeConf: '',
        }
    }

    generatePassCode() {
        var rdm = Math.floor(100000 + Math.random() * 900000);
        this.setState({randomPassCode: rdm});
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#fff', height: '100%'}}>
                <Spinner 
                    visible={this.state.spinner} 
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={{flex: 2, textAlign: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={{marginLeft: 'auto', marginRight: 'auto', marginTop:20, marginBottom: 20, 
                            alignItems: 'center', justifyContent: 'center', width: 250, height: 'auto', minHeight: 120
                        }} 
                        source={require('../../assets/img/banner-logo.png')}
                    />
                </View>
                <View style={styles.inputForm}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.Input}
                        maxLength={25}
                        value={this.state.firstname}
                        onChangeText={(firstname) => this.setState({firstname})}
                    />
                </View>
                <View style={styles.inputForm}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.Input}
                        maxLength={25}
                        value={this.state.lastname}
                        onChangeText={(lastname) => this.setState({lastname})}
                    />
                </View>
                <View style={styles.inputForm}>
                    <Text style={styles.label}>Last 4 of Social</Text>
                    <TextInput
                        style={styles.Input}
                        maxLength={4}
                        secureTextEntry={true}
                        value={this.state.ssn}
                        onChangeText={(ssn) => this.setState({ssn})}
                    />
                </View>
                <View style={styles.verifyForm}>
                    <TouchableOpacity 
                        style={styles.passCodeButton}
                        onPress={() => this.generatePassCode()}
                        >
                        <Text style={styles.smBorderText}>Obtain Passcode</Text>
                    </TouchableOpacity>
                    <Text style={styles.lgBorderText}>{this.state.randomPassCode}</Text>
                    <Text style={styles.centerText}>Enter Passcode</Text>
                    <TextInput
                        style={styles.lgBorderText}
                        maxLength={6}
                        value={this.state.passCodeConf}
                        onChangeText={(text) => this.setState({passCodeConf: text})}
                    />
                    <TouchableOpacity 
                        style={styles.submit}
                        onPress={() => this.fetchClients()}
                        >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    fetchClients() {
        global.clientArr = [{label: 'First', value: '123'}, {label: 'Second', value: '456'}];
        this.props.navigation.navigate('ControlPanel');
    }
}

const styles = StyleSheet.create({
    inputForm: {flex: 1, paddingLeft: '10%', paddingRight: '10%'},
    label: {color: '#000', fontSize: 16, marginBottom: 5},
    Input: {borderColor: '#000', borderWidth: 1, height: 40, color: '#000', fontSize: 18, padding: 5},
    verifyForm: {flex: 3, textAlign: 'center'},
    passCodeButton: {borderWidth: 1, width: '40%', paddingTop: 5, marginTop: 10, marginBottom: 15, marginLeft: '30%', marginRight: '30%'},
    smBorderText: {fontSize: 18, height: 35, alignItems: 'center', justifyContent: 'center', color: '#000', textAlign: 'center'},
    lgBorderText: {borderWidth: 1, fontSize: 30, height: 50, alignItems: 'center', justifyContent: 'center', color: '#000',
        width: '50%', marginLeft: '25%', marginRight: '25%', marginBottom: 10, textAlign: 'center', padding: 5
    },
    centerText: {fontSize: 18, alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#000'},
    submit: {width: '40%', height: 35, borderRadius: 15, backgroundColor: '#000', marginLeft: '30%',
        marginRight: '30%', textAlign: 'center', padding: 5, marginBottom: 10
    },
    submitText: {color: '#fff', fontSize: 18, textAlign: 'center'},
    spinnerTextStyle: { color: '#FFF' }
})

export default LoginScreen;