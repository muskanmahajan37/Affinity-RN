import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Dimensions, Alert } from 'react-native';
import moment from 'moment';
import CONSTS from '../../helpers/Consts';
import SignCaptureModal from './Components/SignCaptureModal';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_KEY, USER_DATA } from '../../helpers/Consts';

class SignAndSendScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ComplianceFlag: true,
            caregiverSign: '',
            caregiverSignDate: '',
            clientSign: '',
            clientSignDate: '',
            SendToPhoneFlag: true,
            Phone1: '',
            Phone2: '',
            SendToEmailFlag: true,
            Email1: '',
            Email2: '',
            PAFreminder: false,
        }
    }

    setComplianceFlag = () => {
        global.ComplianceFlag = !this.state.ComplianceFlag;
        this.setState({ComplianceFlag: !this.state.ComplianceFlag});
    }

    setSendToPhoneFlag = () => {
        global.SendToPhoneFlag = !this.state.SendToPhoneFlag;
        this.setState({SendToPhoneFlag: !this.state.SendToPhoneFlag});
    }

    setSendToEmailFlag = () => {
        global.SendToEmailFlag = !this.state.SendToEmailFlag;
        this.setState({SendToEmailFlag: !this.state.SendToEmailFlag});
    }

    render() {
        const checkedIcon = '../../assets/img/checked-checkbox.png';
        const uncheckedIcon = '../../assets/img/unchecked-checkbox.png';
        return (
            <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                <ScrollView horizontal={false}>
                    <Spinner 
                        visible={this.state.spinner} 
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={{flex: 1, flexDirection: 'row', height:'auto'}}>
                        <View>
                            <TouchableOpacity style={{marginLeft: 20, marginRight: 10}} onPress={this.setComplianceFlag}>
                                { (this.state.ComplianceFlag ? <Image style={{width: 30, height: 30}} source={require('../../assets/img/checked-checkbox.png')} /> : <Image style={{width: 30, height: 30}} source={require('../../assets/img/unchecked-checkbox.png')} />)}
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', paddingRight: 50}}>
                            <Text style={{fontSize: 15, color: '#000', textAlign: 'center', fontWeight: '500', paddingRight: 20}}>
                                TO BE PAID, this document must be signed by the Client and submitted to the office
                            </Text>
                            <Text style={{fontSize: 15, color: '#000', textAlign: 'center', fontWeight: '500', paddingRight: 20}}>
                                NO LATER THAN MONDAY at 5PM of the following week.
                            </Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
                            <View style={{flex: 4, flexDirection: 'row'}}>
                                <View style={{alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 30, fontWeight: '700', color: '#000'}}>CAREGIVER</Text>
                                    <Text style={{fontSize: 18, color: '#000', fontStyle: 'italic'}}>{ global.FirstName + ' ' + global.LastName }</Text>
                                </View>
                            </View>
                            <View style={{flex: 5, flexDirection: 'row'}}>
                                <View style={{}}>
                                    <Text style={{fontSize: 18, color: '#000', fontStyle: 'italic', marginTop: 'auto', left: -10, marginBottom: 5}}>Signature</Text>
                                </View>
                                <View style={{width: '60%'}}>
                                    <SignCaptureModal signer={'caregiver'} signResult={this.state.caregiverSign} onSaveSign={this.onSaveSign}></SignCaptureModal>
                                </View>
                            </View>
                            <View style={{flex: 3, flexDirection: 'column', alignItems: 'center'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 18, color: '#000', textAlign: 'center'}}>Date</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 20, color: '#000', fontStyle: 'italic', textAlign: 'center', backgroundColor: '#dedede', width: 140, height: 30}}>{this.state.caregiverSignDate}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingLeft: 20, paddingRight: 20}}>
                            <Text style={{color: '#000'}}>
                                CAREGIVER: I hereby certify that the dates and hours recorded below were worked by me,
                                and were properly certified by an authorized representative of the named client.
                                I understand that that I am a caregiver of AFFINITY HOME CARE and cannot privately 
                                accept work from their clients. I will not solicit any AFFINITY HOME CARE patient or 
                                client for home health services. In the event I violate this non-solicitation clause, 
                                both parties hereby agree that I shall pay the sum of two thousand dollars ($2,000) to 
                                AFFINITY HOME CARE as liquidated damages for each violation. I also understand that 
                                in order to complete this assignment and to be paid, I must turn in this document no 
                                later than Monday at 5pm the next week after performing services. I have not had a work 
                                related accident/incident in the past month.
                            </Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
                            <View style={{flex: 4, flexDirection: 'row'}}>
                                <View style={{alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 30, fontWeight: '700', color: '#000'}}>CLIENT</Text>
                                    <Text style={{fontSize: 18, color: '#000', fontStyle: 'italic'}}>{ global.client.label }</Text>
                                </View>
                            </View>
                            <View style={{flex: 5, flexDirection: 'row'}}>
                                <View style={{}}>
                                    <Text style={{fontSize: 18, color: '#000', fontStyle: 'italic', marginTop: 'auto', left: -10, marginBottom: 5}}>Signature</Text>
                                </View>
                                <View style={{width: '60%'}}>
                                    <SignCaptureModal signer={'client'} signResult={this.state.clientSign} onSaveSign={this.onSaveSign}></SignCaptureModal>
                                </View>
                            </View>
                            <View style={{flex: 3, flexDirection: 'column', alignItems: 'center'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 18, color: '#000', textAlign: 'center'}}>Date</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 20, color: '#000', fontStyle: 'italic', textAlign: 'center', backgroundColor: '#dedede', width: 140, height: 30}}>{this.state.clientSignDate}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingLeft: 20, paddingRight: 20}}>
                            <Text style={{color: '#000'}}>
                                CLIENT: I certify that the hours recorded above are correct, the caregiver's performance 
                                was satisfactory, and AFFINITY HOME CARE can pay this caregiver for the hours approved by me.
                                I further agree if I terminate home health services from AFFINITY HOME CARE, I cannot hire,
                                neither directly nor indirectly, any AFFINITY HOME CARE contractor to perform home health 
                                services for a period of one (1)year from the last day AFFINITY HOME CARE provided services.
                                If I breach this condition, I will be liable to AFFINITY HOME CARE for a finder's fee in the 
                                amount of $5,000, plus reasonable attorney's fees and costs.
                            </Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end', paddingRight: 20}}>
                        <TouchableOpacity onPress={() => this.openPAFForm()}>
                            <Text style={{fontSize: 20, color: '#000'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 20}}>
                        <View>
                            <Text style={{textAlign: 'center', fontSize: 18, color: '#000'}}>PHONE NUMBERS TO SEND A COPY OF DAILY CARE NOTES</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop: 15}}>
                            <TouchableOpacity style={{marginLeft: 20, marginRight: 10, marginTop: 5}} onPress={this.setSendToPhoneFlag}>
                                { (this.state.SendToPhoneFlag ? <Image style={{width: 30, height: 30}} source={require('../../assets/img/checked-checkbox.png')} /> : <Image style={{width: 30, height: 30}} source={require('../../assets/img/unchecked-checkbox.png')} />)}
                            </TouchableOpacity>
                            <View style={{width: '100%', flexDirection: 'row', height: 40, paddingRight: 50}}>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={20} keyboardType='phone-pad' value={this.state.Phone1} onChangeText={(phone) => { this.setState({Phone1: phone}); global.Phone1 = phone; }} placeholder='Client Phone Number' />
                                </View>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={20} keyboardType='phone-pad' value={this.state.Phone2} onChangeText={(phone) => { this.setState({Phone2: phone}); global.Phone2 = phone; }} placeholder='Caregiver Phone Number' />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <View>
                            <Text style={{textAlign: 'center', fontSize: 18, color: '#000'}}>EMAILS TO SEND A COPY OF DAILY CARE NOTES</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop: 15}}>
                            <TouchableOpacity style={{marginLeft: 20, marginRight: 10, marginTop: 5}} onPress={this.setSendToEmailFlag}>
                                { (this.state.SendToEmailFlag ? <Image style={{width: 30, height: 30}} source={require('../../assets/img/checked-checkbox.png')} /> : <Image style={{width: 30, height: 30}} source={require('../../assets/img/unchecked-checkbox.png')} />)}
                            </TouchableOpacity>
                            <View style={{width:'100%', flexDirection: 'row', height: 40, paddingRight: 50}}>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={25} keyboardType='email-address' value={this.state.Email1} onChangeText={(email) => { this.setState({Email1: email}); global.Email1 = email; }} placeholder='Client Email' />
                                </View>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={25} keyboardType='email-address' value={this.state.Email2} onChangeText={(email) => { this.setState({Email2: email}); global.Email2 = email; }} placeholder='Caregiver Email' />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 15, marginTop: 20}}>
                        <View style={{}}>
                            <TouchableOpacity 
                                style={[styles.btn, styles.btnBlue]} 
                                onPress={() => this.saveAndExitSignForm()}
                            >
                                <Text style={styles.btnText}>SAVE & EXIT</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity 
                                style={[styles.btn, styles.btnRed]} 
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Text style={styles.btnText}>REVIEW</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity 
                                style={[styles.btn, styles.btnGreen]}
                                onPress={() => this.sendSignForm()}
                            >
                                <Text style={styles.btnText}>SEND</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        );
    };

    onSaveSign = (signObj) => {
        switch (signObj.signer) {
            case 'caregiver':
                global.CaregiverSignature = CONSTS.BASE64_HEADER + signObj.result.encoded;
                global.CaregiverSignatureDate = moment(new Date()).format("M/DD/YYYY");
                this.setState({ caregiverSign: global.CaregiverSignature, caregiverSignDate: global.CaregiverSignatureDate });
                break;
            case 'client':
                global.ClientSignature = CONSTS.BASE64_HEADER + signObj.result.encoded;
                global.ClientSignatureDate = moment(new Date()).format("M/DD/YYYY")
                this.setState({ clientSign: global.ClientSignature, clientSignDate: global.ClientSignatureDate });
                break;
        }
    }

    openPAFForm() {
        this.props.navigation.navigate('PatientAdmissionForm')
    }

    saveAndExitSignForm() {
        this.props.navigation.navigate('ControlPanel')
    }

    sendSignForm() {
        var DCNImageFileName = global.FirstName + global.LastName + '_' + (new Date().getTime());
        const data = new FormData();
        data.append('ImageOfDCN', {
            uri: global.ImageOfDCN,
            type: 'image/png',
            name: DCNImageFileName
        });
        data.append('DCNImageFileName', DCNImageFileName);
        data.append('SocialSecurityNum', global.SocialSecurityNum); // for DCN Submitted Header
        data.append('ClientId', global.ClientId);
        data.append('LastSaturdayDate', global.LastSaturdayDate);
        data.append('HourlyFlag', global.HourlyFlag);
        data.append('LiveInFlag', global.LiveInFlag);
        data.append('OvernightFlag', global.OvernightFlag);
        data.append('WeekTotalHours', global.WeekTotalHours);
        data.append('ComplianceFlag', global.ComplianceFlag);
        data.append('CaregiverSignature', global.CaregiverSignature);
        data.append('CaregiverSignatureDate', moment(new Date(global.CaregiverSignatureDate)).format("YYYY-MM-DD"));
        data.append('ClientSignature', global.ClientSignature);
        data.append('ClientSignatureDate', moment(new Date(global.ClientSignatureDate)).format("YYYY-MM-DD"));
        data.append('HasPAF', global.HasPAF);
        // // data.append('PafId', global.PafId);
        data.append('SendToPhoneFlag', global.SendToPhoneFlag);
        data.append('Phone1', global.Phone1);
        data.append('Phone2', global.Phone2);
        data.append('SendToEmailFlag', global.SendToEmailFlag);
        data.append('Email1', global.Email1);
        data.append('Email2', global.Email2);
        data.append('DateTimeOfSubmission', global.DateTimeOfSubmission);
        data.append('GPSLocationOfSubmission', global.GPSLocationOfSubmission); // ---
        // data.append('ImageOfDCN', global.ImageOfDCN);
        data.append('PDFOfDCN', global.PDFOfDCN); // ===
        // data.append('createdBy', global.createdBy);
        // data.append('created', global.created);
        // data.append('updatedBy', global.updatedBy);
        // data.append('updated', global.updated);
        data.append('selectedWeek', global.selectedWeek); // for DCN Submitted Detail
        data.append('TimeInOutLength', global.TimeInOutLength);
        data.append('TimeIn1', JSON.stringify(global.TimeIn_1_Arr));
        data.append('TimeIn2', JSON.stringify(global.TimeIn_2_Arr));
        data.append('TimeIn3', JSON.stringify(global.TimeIn_3_Arr));
        data.append('TimeIn4', JSON.stringify(global.TimeIn_4_Arr));
        data.append('TimeOut1', JSON.stringify(global.TimeOut_1_Arr));
        data.append('TimeOut2', JSON.stringify(global.TimeOut_2_Arr));
        data.append('TimeOut3', JSON.stringify(global.TimeOut_3_Arr));
        data.append('TimeOut4', JSON.stringify(global.TimeOut_4_Arr));
        data.append('HoursPerDay', JSON.stringify(global.HoursPerDay_Arr));
        data.append('MobilityWalkingMovingFlag', JSON.stringify(global.MobilityWalkingMovingFlag));
        data.append('BathingShoweringFlag', JSON.stringify(global.BathingShoweringFlag));
        data.append('DressingFlag', JSON.stringify(global.DressingFlag));
        data.append('ToiletingFlag', JSON.stringify(global.ToiletingFlag));
        data.append('EatingFlag', JSON.stringify(global.EatingFlag));
        data.append('ContinenceBladderBowelFlag', JSON.stringify(global.ContinenceBladderBowelFlag));
        data.append('MealPrepIncludingFlag', JSON.stringify(global.MealPrepIncludingFlag));
        data.append('LaundryFlag', JSON.stringify(global.LaundryFlag));
        data.append('LightHousekeepingIncludingFlag', JSON.stringify(global.LightHousekeepingIncludingFlag));
        data.append('PersonalCareHours', global.PersonalCareHours); // -----
        data.append('HomemakingHours', global.HomemakingHours);
        data.append('CompanionHours', global.CompanionHours);
        data.append('RespiteHours', global.RespiteHours);
        data.append('AttendantHours', global.AttendantHours); // =====
        data.append('author', global.FirstName + ' ' + global.LastName); // --- created by or updated by
        fetch(CONSTS.BASE_API + 'send_data', {
            method: 'POST', 
            body: data
        })
        .then((res) => res.json())
        .then((resJson) => {
            console.log('resjson=', resJson);
            this.setState({spinner: false});
        })
        .catch((err) => {
            console.log('err=', err);
            Alert.alert('Error', 'Network request failed');
            this.setState({spinner: false});
        });
    }
    
}

const styles = StyleSheet.create({
    contentContainer: {paddingVertical: 20, backgroundColor: '#fff', height: '100%', minWidth: 568, 
        width: Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height 
    },
    btn: { alignContent: 'center', justifyContent: 'center', textAlign: 'center', width: 120, height: 35, borderRadius: 12 },
    btnBlue: { backgroundColor: '#b8d5ff' },
    btnRed: { backgroundColor: '#fc8d82' },
    btnGreen: { backgroundColor: '#aeffb2' },
    btnText: { fontSize: 17, color: '#000', textAlign: 'center', fontWeight: '700' },
    spinnerTextStyle: { color: '#FFF' }
});

export default SignAndSendScreen;