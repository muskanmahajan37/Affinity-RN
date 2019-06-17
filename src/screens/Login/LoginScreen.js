import React from 'react';
import { ScrollView, View, Image, Text, TextInput, 
    TouchableOpacity, StyleSheet, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import CONSTS, { USER_KEY, USER_DATA } from '../../helpers/Consts';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../helpers/API';

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
        // --- auto fill to login fields for testing --- //
        AsyncStorage.setItem('loginLimit', '0');
        AsyncStorage.setItem('passcodeLimit', '0');
        this.setState({
            firstname: 'Evan',
            lastname: 'Shapiro',
            ssn: '0001'
        });
        AsyncStorage.getItem(USER_KEY).then(res => {
            if(res) {
                var userinfo = JSON.parse(res);
                this.setState({
                    firstname: userinfo.firstname,
                    lastname: userinfo.lastname
                });
            }
        });
        AsyncStorage.getItem('loginLimit').then(res => {
            if(!res) AsyncStorage.setItem('loginLimit', '0');
        });
        AsyncStorage.getItem('DCNObj').then(res => {
            if(res) {
                global.DCNReadyStatus = true;
                this.initDCNGlobalParamsFromLocal(res);
            } else {
                global.DCNReadyStatus = false;
            }
        });
    }

    initDCNGlobalParamsFromLocal(res) {
        var DCNObj = JSON.parse(res);
        global.isNewDCN = DCNObj.isNewDCN;
        global.DcnHeaderId = DCNObj.DcnHeaderId;
        global.DcnDetailIds = DCNObj.DcnDetailIds;
        global.oldImageOfDCN = DCNObj.oldImageOfDCN;
        global.ImageOfDCN = DCNObj.ImageOfDCN;
        global.DCNImageFileName = DCNObj.DCNImageFileName;
        global.SocialSecurityNum = DCNObj.SocialSecurityNum; // for DCN Submitted Head,
        global.ClientId = DCNObj.ClientId;
        global.ClientName = DCNObj.ClientName;
        global.LastSaturdayDate = DCNObj.LastSaturdayDate;
        global.HourlyFlag = DCNObj.HourlyFlag;
        global.LiveInFlag = DCNObj.LiveInFlag;
        global.OvernightFlag = DCNObj.OvernightFlag;
        global.WeekTotalHours = DCNObj.WeekTotalHours;
        global.ComplianceFlag = DCNObj.ComplianceFlag;
        global.CaregiverSignature = DCNObj.CaregiverSignature;
        global.CaregiverSignatureDate = DCNObj.CaregiverSignatureDate;
        global.ClientSignature = DCNObj.ClientSignature;
        global.ClientSignatureDate = DCNObj.ClientSignatureDate;
        global.HasPAF = DCNObj.HasPAF;
        // // global.PafId = DCNObj.PafId;
        global.SendToPhoneFlag = DCNObj.SendToPhoneFlag;
        global.Phone1 = DCNObj.Phone1;
        global.Phone2 = DCNObj.Phone2;
        global.SendToEmailFlag = DCNObj.SendToEmailFlag;
        global.Email1 = DCNObj.Email1;
        global.Email2 = DCNObj.Email2;
        global.DateTimeOfSubmission = DCNObj.DateTimeOfSubmission;
        global.GPSLocationOfSubmission = DCNObj.GPSLocationOfSubmission; // ---
        global.PDFOfDCN = DCNObj.PDFOfDCN; // ===
        // global.createdBy = DCNObj.createdBy;
        // global.created = DCNObj.created;
        // global.updatedBy = DCNObj.updatedBy;
        // global.updated = DCNObj.updated;
        global.selectedWeek = JSON.parse(DCNObj.selectedWeek); // for DCN Submitted Detail
        global.DCNWeek = JSON.parse(DCNObj.DCNWeek); // for DCNWeek Submitted Detail
        global.TimeInOutLength = DCNObj.TimeInOutLength;
        global.TimeIn_1_Arr = JSON.parse(DCNObj.TimeIn1);
        global.TimeIn_2_Arr = JSON.parse(DCNObj.TimeIn2);
        global.TimeIn_3_Arr = JSON.parse(DCNObj.TimeIn3);
        global.TimeIn_4_Arr = JSON.parse(DCNObj.TimeIn4);
        global.TimeOut_1_Arr = JSON.parse(DCNObj.TimeOut1);
        global.TimeOut_2_Arr = JSON.parse(DCNObj.TimeOut2);
        global.TimeOut_3_Arr = JSON.parse(DCNObj.TimeOut3);
        global.TimeOut_4_Arr = JSON.parse(DCNObj.TimeOut4);
        global.HoursPerDay_Arr = JSON.parse(DCNObj.HoursPerDay);
        global.MobilityWalkingMovingFlag = JSON.parse(DCNObj.MobilityWalkingMovingFlag);
        global.BathingShoweringFlag = JSON.parse(DCNObj.BathingShoweringFlag);
        global.DressingFlag = JSON.parse(DCNObj.DressingFlag);
        global.ToiletingFlag = JSON.parse(DCNObj.ToiletingFlag);
        global.EatingFlag = JSON.parse(DCNObj.EatingFlag);
        global.ContinenceBladderBowelFlag = JSON.parse(DCNObj.ContinenceBladderBowelFlag);
        global.MealPrepIncludingFlag = JSON.parse(DCNObj.MealPrepIncludingFlag);
        global.LaundryFlag = JSON.parse(DCNObj.LaundryFlag);
        global.LightHousekeepingIncludingFlag = JSON.parse(DCNObj.LightHousekeepingIncludingFlag);
        global.PersonalCareHours = DCNObj.PersonalCareHours; // -----
        global.HomemakingHours = DCNObj.HomemakingHours;
        global.CompanionHours = DCNObj.CompanionHours;
        global.RespiteHours = DCNObj.RespiteHours;
        global.AttendantHours = DCNObj.AttendantHours; // =====
        global.FirstName = DCNObj.author.split(' ')[0];
        global.LastName = DCNObj.author.split(' ')[1];
    }

    generatePassCode() {
        AsyncStorage.getItem('loginLimit').then((value) => {
            var loginLimit = value ? parseInt(value) : 0;
            if (loginLimit >= 3) {
                this.afAlert('Please call our office for help at 954-782-3741');
            } else {
                this.setState({spinner: true});
                console.log('before=', this.state.firstname, this.state.lastname, this.state.ssn);
                var user = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    ssn: this.state.ssn
                };
                API.get_passcode(user)
                .then((res) => {
                    if(res.status == 0) {
                        var data = JSON.parse(res.data);
                        this.setState({ randomPassCode: data.passcode });
                        global.FirstName = data.userinfo.firstname; // DB - Caregiver First Name
                        global.LastName = data.userinfo.lastname; // DB - Caregiver Last Name
                        global.SocialSecurityNum = data.userinfo.ssn; // DB - Caregiver SSN
                        AsyncStorage.setItem(USER_KEY, JSON.stringify(data.userinfo));
                        AsyncStorage.setItem('loginLimit', '0');
                        AsyncStorage.setItem('passcodeLimit', '0');
                        this.setState({spinner: false});
                    } else {
                        this.afAlert('', res.msg);
                        AsyncStorage.setItem('loginLimit', (loginLimit + 1).toString());
                    }
                })
                .catch((err) => {
                    console.log('err=', err);
                    this.afAlert('Error', 'Cannot find server.');
                    AsyncStorage.setItem('loginLimit', (loginLimit + 1).toString());
                });
            }
        }).done();       
    }

    afAlert = (title, msg) => {
        Alert.alert(
            title,
            msg,
            [{ text: 'OK', onPress: () => this.setState({spinner: false}) }],
            {cancelable: false},
        );
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#fff', height: '100%'}}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : ''} enabled>
                    <Spinner 
                        visible={this.state.spinner} 
                        textContent={''}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={{flex: 2, textAlign: 'center', flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS == 'ios' ? 50 : 0}}>
                        <Image
                            style={{marginLeft: 'auto', marginRight: 'auto', marginTop:20, marginBottom: 20, 
                                alignItems: 'center', justifyContent: 'center', width: 270, height: 'auto', minHeight: 120
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
                            keyboardType={'numeric'}
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
                            keyboardType={'numeric'}
                            value={this.state.passCodeConf}
                            onChangeText={(text) => this.setState({passCodeConf: text})}
                        />
                        <TouchableOpacity 
                            style={styles.submit}
                            onPress={() => this.submitLoginForm()}
                            >
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }

    submitLoginForm() {
        AsyncStorage.getItem('passcodeLimit').then((value) => {
            var passcodeLimit = value ? parseInt(value) : 0;
            if (passcodeLimit >= 3) {
                this.afAlert('', 'Please call our office for help at 954-782-3741');
            } else {
                this.setState({spinner: true});
                var user = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    ssn: this.state.ssn,
                    passcode: this.state.randomPassCode,
                    passcodeconf: this.state.passCodeConf
                };
                API.login(user)
                .then((res) => {
                    var data = JSON.parse(res.data);
                    if(res.status == 0) {
                        global.FirstName = data.userinfo.firstname; // Caregiver First Name
                        global.LastName = data.userinfo.lastname; // Caregiver Last Name
                        global.SocialSecurityNum = data.userinfo.ssn; // Caregiver SSN
                        AsyncStorage.setItem(USER_KEY, JSON.stringify(data.userinfo));
                        AsyncStorage.setItem('loginLimit', '0');
                        AsyncStorage.setItem('passcodeLimit', '0');
                        this.fetchClients();
                        this.setState({spinner: false});
                    } else {
                        if (data.passcode) { this.setState({ randomPassCode: data.passcode }); }
                        this.afAlert('', res.msg);
                    }
                    AsyncStorage.setItem('passcodeLimit', (passcodeLimit + 1).toString());
                })
                .catch((err) => {
                    console.log('err=', err);
                    this.afAlert('', 'Can not find server.');
                    AsyncStorage.setItem('passcodeLimit', (passcodeLimit + 1).toString());
                });
            }
        }).done();
    }

    fetchClients() {
        this.setState({spinner: true});
        var params = {
            ssn: global.SocialSecurityNum
        }
        API.get_clients(params)
        .then((res) => {
            if(res.status == 0) {
                var clientObjArr = JSON.parse(res.data);
                var clientArr = [];
                var clientIdArr = []
                var clientNameArr = []
                for(var i = 0; i < clientObjArr.length; i++) {
                    var clientName = clientObjArr[i].FirstName + ' ' + clientObjArr[i].LastName;
                    var clientId = clientObjArr[i].ClientId.toString();
                    var item = {
                        label: clientName,
                        value: clientId
                    }
                    clientArr.push(item);
                    clientNameArr.push(clientName);
                    clientIdArr.push(clientId);
                }
                global.clientArr = clientArr;
                global.clientNameArr = clientNameArr;
                global.clientIdArr = clientIdArr;
                this.setState({spinner: false});
                this.props.navigation.navigate('ControlPanel');
            } else {
                this.afAlert('', res.msg);
            }
        })
        .catch((err) => {
            console.log('err=', err);
            this.afAlert('', 'Can not find server.');
        });
    }
}

const styles = StyleSheet.create({
    inputForm: {flex: 1, paddingLeft: '10%', paddingRight: '10%'},
    label: {color: '#000', fontSize: 16, marginBottom: 5},
    Input: {borderColor: '#000', borderWidth: 1, height: 40, color: '#000', fontSize: 18, padding: 5},
    verifyForm: {flex: 3, textAlign: 'center'},
    passCodeButton: {borderWidth: 1, width: '40%', height: 35, marginTop: 10, marginBottom: 15, marginLeft: '30%', marginRight: '30%'},
    smBorderText: {fontSize: 18, alignItems: 'center', justifyContent: 'center', color: '#000', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto'},
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