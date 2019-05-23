import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import moment from 'moment';
import CONSTS from '../../helpers/Consts';
import SignCaptureModal from './Components/SignCaptureModal';

class SignAndSendScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toBePaidFlag: true,
            caregiverSign: '',
            caregiverSignDate: '',
            clientSign: '',
            clientSignDate: '',
            phoneToSendDCNFlag: true,
            phoneClient: '',
            phoneCaregiver: '',
            emailToSendDCNFlag: true,
            emailClient: '',
            emailCaregiver: '',
            PAFreminder: false,
        }
    }

    render() {
        const checkedIcon = '../../assets/img/checked-checkbox.png';
        const uncheckedIcon = '../../assets/img/unchecked-checkbox.png';
        return (
            <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                <ScrollView horizontal={false}>
                    <View style={{flex: 1, flexDirection: 'row', height:'auto'}}>
                        <View>
                            <TouchableOpacity style={{marginLeft: 20, marginRight: 10}} onPress={() => this.setState({toBePaidFlag: !this.state.toBePaidFlag})}>
                                { (this.state.toBePaidFlag ? <Image style={{width: 30, height: 30}} source={require('../../assets/img/checked-checkbox.png')} /> : <Image style={{width: 30, height: 30}} source={require('../../assets/img/unchecked-checkbox.png')} />)}
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
                                    <Text style={{fontSize: 18, color: '#000', fontStyle: 'italic'}}>Marie Petit</Text>
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
                                    <Text style={{fontSize: 18, color: '#000', fontStyle: 'italic'}}>Marie Smith</Text>
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
                            <TouchableOpacity style={{marginLeft: 20, marginRight: 10, marginTop: 5}} onPress={() => this.setState({phoneToSendDCNFlag: !this.state.phoneToSendDCNFlag})}>
                                { (this.state.phoneToSendDCNFlag ? <Image style={{width: 30, height: 30}} source={require('../../assets/img/checked-checkbox.png')} /> : <Image style={{width: 30, height: 30}} source={require('../../assets/img/unchecked-checkbox.png')} />)}
                            </TouchableOpacity>
                            <View style={{width: '100%', flexDirection: 'row', height: 40, paddingRight: 50}}>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={20} keyboardType='phone-pad' value={this.state.phoneClient} onChangeText={(phone) => this.setState({phoneClient: phone})} placeholder='Client Phone Number' />
                                </View>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={20} keyboardType='phone-pad' value={this.state.phoneCaregiver} onChangeText={(phone) => this.setState({phoneCaregiver: phone})} placeholder='Caregiver Phone Number' />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <View>
                            <Text style={{textAlign: 'center', fontSize: 18, color: '#000'}}>EMAILS TO SEND A COPY OF DAILY CARE NOTES</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop: 15}}>
                            <TouchableOpacity style={{marginLeft: 20, marginRight: 10, marginTop: 5}} onPress={() => this.setState({emailToSendDCNFlag: !this.state.emailToSendDCNFlag})}>
                                { (this.state.emailToSendDCNFlag ? <Image style={{width: 30, height: 30}} source={require('../../assets/img/checked-checkbox.png')} /> : <Image style={{width: 30, height: 30}} source={require('../../assets/img/unchecked-checkbox.png')} />)}
                            </TouchableOpacity>
                            <View style={{width:'100%', flexDirection: 'row', height: 40, paddingRight: 50}}>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={25} keyboardType='email-address' value={this.state.emailClient} onChangeText={(email) => this.setState({emailClient: email})} placeholder='Client Email' />
                                </View>
                                <View style={{flex: 1, borderWidth: 1, borderColor: '#000', marginRight: 30}}>
                                    <TextInput style={{width: '100%', padding: 5, fontWeight: '600', fontSize: 18}} maxLength={25} keyboardType='email-address' value={this.state.emailCaregiver} onChangeText={(email) => this.setState({emailCaregiver: email})} placeholder='Caregiver Email' />
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
                this.setState({ caregiverSign: CONSTS.BASE64_HEADER + signObj.result.encoded, caregiverSignDate: moment(new Date()).format("M/DD/YYYY") });
                break;
            case 'client':
                this.setState({ clientSign: CONSTS.BASE64_HEADER + signObj.result.encoded, clientSignDate: moment(new Date()).format("M/DD/YYYY") });
                break;
        }
    }

    openPAFForm() {
        this.props.navigation.navigate('PatientAdmissionForm')
    }

    saveAndExitSignForm() {
        alert('clicked Save & Exit button!')
        this.props.navigation.goBack()
    }

    sendSignForm() {
        alert('clicked Send button!')
        // this.props.navigation.navigate('')
    }
    
}

const styles = StyleSheet.create({
    contentContainer: {paddingVertical: 20, backgroundColor: '#fff', height: '100%', minWidth: 568, width: Dimensions.get('window').width},
    btn: { alignContent: 'center', justifyContent: 'center', textAlign: 'center', width: 120, height: 35, borderRadius: 12 },
    btnBlue: { backgroundColor: '#b8d5ff' },
    btnRed: { backgroundColor: '#fc8d82' },
    btnGreen: { backgroundColor: '#aeffb2' },
    btnText: { fontSize: 17, color: '#000', textAlign: 'center', fontWeight: '700' }
});

export default SignAndSendScreen;