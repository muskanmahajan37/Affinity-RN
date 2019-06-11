import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, 
    TextInput, Dimensions, Image, Platform } from 'react-native';

import ConsentForTreatmentSection from './Components/1.ConsentForTreatment';
import DrivingConsumerSection from './Components/2.DrivingConsumer';
import AssistanceSection from './Components/3.Assistance';
import AdvancedDirectivesSection from './Components/4.AdvancedDirectives';
import AbuseHotlineSection from './Components/5.AbuseHotline';
import PlanOfTreatmentSection from './Components/6.PlanOfTreatment';
import AvailabilityOfNurseSection from './Components/7.AvailabilityOfNurse';
import HurricaneSection from './Components/8.Hurricane';
import AuthToReleaseSection from './Components/9.AuthToRealse';
import PatientRightsSection from './Components/10.PatientRights';
import CertificationSectionSection from './Components/Certification';

class  PatientAdmissionFormScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toBePaidFlag: true
        }
    }

    render() {
        const state = this.state;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                <ScrollView style={{paddingLeft: 20, paddingRight: 20}} horizontal={false}>
                    <View style={{alignItems: 'flex-end', marginTop: 10, marginTop: Platform.OS == 'ios' ? 50 : 0}}>
                        <TouchableOpacity onPress={() => this.closePAFForm()}>
                            <Text style={{fontSize: 25, color: '#000'}}>–</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 25, color: '#000', fontWeight: '700'}}>Patient Admission Form</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 16, color: '#000', fontWeight: '600', marginTop: 'auto'}}>Patient Name: </Text>
                            </View>
                            <View style={{width: '60%', height: 30, borderBottomWidth: 1, borderColor: '#000', marginTop: 'auto'}}>
                                <TextInput style={{fontSize: 16, height:30, color: '#000', padding: 0}} />
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '600'}}>Managed Care</Text>
                    </View>
                    <View><ConsentForTreatmentSection /></View>
                    <View><DrivingConsumerSection /></View>
                    <View><AssistanceSection /></View>
                    <View><AdvancedDirectivesSection /></View>
                    <View><AbuseHotlineSection /></View>
                    <View><PlanOfTreatmentSection /></View>
                    <View><AvailabilityOfNurseSection /></View>
                    <View><HurricaneSection /></View>
                    <View><AuthToReleaseSection /></View>
                    <View><PatientRightsSection /></View>
                    <View><CertificationSectionSection /></View>
                </ScrollView>
            </ScrollView>
        );
    };

    closePAFForm() {
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    contentContainer: {backgroundColor: '#fff', height: '100%', 
        width: Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height 
    },
    btn: { alignContent: 'center', justifyContent: 'center', textAlign: 'center', width: 120, height: 35, borderRadius: 12 },
    btnBlue: { backgroundColor: '#b8d5ff' },
    btnRed: { backgroundColor: '#fc8d82' },
    btnGreen: { backgroundColor: '#aeffb2' },
    btnText: { fontSize: 17, color: '#000', textAlign: 'center', fontWeight: '700' }
});

export default PatientAdmissionFormScreen;