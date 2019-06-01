import React from 'react';
import { ScrollView, View, Image, Text, TextInput, 
    TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CONSTS from '../../helpers/Consts';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_KEY, USER_DATA } from '../../helpers/Consts';

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

    componentDidMount() {
        var user = AsyncStorage.getItem(USER_KEY).then(res => {
            var userinfo = JSON.parse(res);
            this.setState({
                firstname: userinfo.firstname,
                lastname: userinfo.lastname
            });    
        });
    }

    generatePassCode() {
        AsyncStorage.getItem('loginLimit').then((value) => {
            var loginLimit = value ? value : 0;
            console.log('-0=-0=', value, loginLimit);
            if (loginLimit >= 3) {
                Alert.alert('Please call our office for help at 954-782-3741');
            } else {
                this.setState({spinner: true});
                fetch(CONSTS.BASE_API + 'login/get_passcode', {
                    method: 'POST', 
                    headers:{
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        ssn: this.state.ssn
                    })
                })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('resjson=', resJson);
                    if(resJson.status == 0) {
                        var data = JSON.parse(resJson.data);
                        this.setState({ randomPassCode: data.passcode });
                        global.FirstName = data.userinfo.firstname; // DB - Caregiver First Name
                        global.LastName = data.userinfo.lastname; // DB - Caregiver Last Name
                        global.SocialSecurityNum = data.userinfo.ssn; // DB - Caregiver SSN
                        AsyncStorage.setItem(USER_KEY, JSON.stringify(data.userinfo));
                    } else {
                        Alert.alert('', resJson.msg);
                    }
                    console.log('0000===', loginLimit + 1);
                    this.setState({spinner: false});
                    // AsyncStorage.setItem('loginLimit', loginLimit + 1).then(x => {
                    //     this.setState({spinner: false});
                    // })
                })
                .catch((err) => {
                    console.log('err=', err);
                    this.setState({spinner: false});
                    // AsyncStorage.setItem('loginLimit', loginLimit + 1).then(x => {
                    //     this.setState({spinner: false});
                    // })
                });
            }
        }).done();       
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#fff', height: '100%'}}>
                <Spinner 
                    visible={this.state.spinner} 
                    textContent={'Loading...'}
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

    submitLoginForm() {
        AsyncStorage.getItem('passcodeLimit').then((value) => {
            var passcodeLimit = value ? value : 0;
            console.log('-0=-0=', value, passcodeLimit);
            if (passcodeLimit >= 3) {
                Alert.alert('Please call our office for help at 954-782-3741');
            } else {
                this.setState({spinner: true});
                fetch(CONSTS.BASE_API + 'login', {
                    method: 'POST', 
                    headers:{
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        ssn: this.state.ssn,
                        passcode: this.state.randomPassCode,
                        passcodeconf: this.state.passCodeConf
                    })
                })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('resjson=', resJson);
                    var data = JSON.parse(resJson.data);
                    if(resJson.status == 0) {
                        global.FirstName = data.userinfo.firstname; // Caregiver First Name
                        global.LastName = data.userinfo.lastname; // Caregiver Last Name
                        global.SocialSecurityNum = data.userinfo.ssn; // Caregiver SSN
                        AsyncStorage.setItem(USER_KEY, JSON.stringify(data.userinfo));
                        this.fetchClients();
                    } else {
                        if (data.passcode) { this.setState({ randomPassCode: data.passcode }); }
                        Alert.alert('', resJson.msg);
                        this.setState({spinner: false});
                    }
                    console.log('0000===', passcodeLimit + 1);
                    // AsyncStorage.setItem('passcodeLimit', passcodeLimit + 1).then(x => {
                    //     this.setState({spinner: false});
                    // })
                })
                .catch((err) => {
                    console.log('err=', err);
                    this.setState({spinner: false});
                    Alert.alert('', 'Can not find server.');
                    // AsyncStorage.setItem('passcodeLimit', passcodeLimit + 1).then(x => {
                    //     this.setState({spinner: false});
                    // })
                });
            }
        }).done();  
    }

    fetchClients() {
        this.setState({spinner: true});
        fetch(CONSTS.BASE_API + 'cpanel/client')
        .then((res) => res.json())
        .then((resJson) => {
            console.log('resjson=', resJson);
            if(resJson.status == 0) {
                var clientObjArr = JSON.parse(resJson.data);
                var clientArr = [];
                for(var i = 0; i < clientObjArr.length; i++) {
                    var item = {
                        label: clientObjArr[i].FirstName + ' ' + clientObjArr[i].LastName,
                        value: clientObjArr[i].ClientId.toString()
                    }
                    clientArr.push(item);
                }
                global.clientArr = clientArr;
                this.setState({spinner: false});
                this.props.navigation.navigate('ControlPanel');
            } else {
                Alert.alert('', resJson.msg);
                this.setState({spinner: false});
            }
        })
        .catch((err) => {
            console.log('err=', err);
            Alert.alert('', 'Can not find server.');
            this.setState({spinner: false});
        });
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