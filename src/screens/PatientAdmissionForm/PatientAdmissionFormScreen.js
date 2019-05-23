import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Dimensions, Image } from 'react-native';

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
                <ScrollView style={{padding: 20}} horizontal={false}>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => this.closePAFForm()}>
                            <Text style={{fontSize: 25, color: '#000'}}>-</Text>
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
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>1. Conset for Treament: </Text>
                        <Text style={{fontSize: 16, color: '#000'}}>I </Text>
                        <View style={{borderBottomWidth: 1, borderBottomColor: '#000', height: 25}}>
                            <TextInput style={{fontSize: 16, width: 150}} />
                        </View>
                        <Text style={{fontSize: 16, color: '#000'}}>
                            , hereby authorize Affinity Home Care and its agents to provide me with care, treatment and procedures and 
                            required by me or my legal representative, as it pertains to home care.
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-start', marginTop: 15}}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>2. Driving Consumer is NOT allowed </Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    Caregiver/Contractor (CNA/HHA/Companion/Homemaker) is NOT ALLOWED to drive the cusumer.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-start', marginTop: 15}}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>3. Assistance with Self-Administration of Medication </Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    Caregiver/Contractor (CNA/HHA/Companion/Homemaker) is NOT ALLOWED to touch or administer pills or medication, including non-prescription drugs.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-start', marginTop: 15}}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>4. Advanced Directives </Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    Does the patient have a "Living Will"? 
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({toBePaidFlag: !this.state.toBePaidFlag})}>
                                    { this.state.toBePaidFlag ? <Image style={{width: 15, height: 15}} source={require('../../assets/img/checked-checkbox.png')} /> : <Image style={{width: 15, height: 15}} source={require('../../assets/img/unchecked-checkbox.png')} /> }
                                </TouchableOpacity>
                                <Text style={{fontSize: 16}}>If yes, copy is with</Text>
                                <TextInput style={{fontSize: 16}} />
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-start', marginTop: 15}}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>5. Abuse Hotline </Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{}}>
                                <Text style={{fontSize: 16, color: '#000', marginLeft: 30}}>
                                    Patients can call 1-800-962-2873 to complain, report abuse, neglect and exploitation or inquire about any service provider.
                                    Patient received information about REPORTING ABUSE, NEGLECT AND EXPLOITATION.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-start', marginTop: 15}}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>6. Plan of Treatment </Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 16, marginLeft: 15, color: '#000'}}>The patient's family caregiver or guardian must be informed by the home health care provider that:</Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    He/She has the right to be informed of the plan of treatment
                                </Text>
                            </View>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    He/She has the right to participate in the development of the plan of treatment
                                </Text>
                            </View>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    He/She may have a copy of the plan if requested
                                </Text>
                            </View>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    The caregiver being referred is an independent contractor of the registry
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-start', marginTop: 15}}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: '600', color: '#000', width: 'auto', borderBottomWidth: 1, borderColor: '#000'}}>7. Availability of Nurse </Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <View style={{width: 7, height: 7, backgroundColor: '#000', borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 30}}></View>
                            <View style={{width: Dimensions.get('window').width - 60}}>
                                <Text style={{fontSize: 16, color: '#000'}}>
                                    Affinity Home Care has available on-call nurse, during hours of patient services (for CNA or HHA services), and
                                    24 hour availablility to a nurse by active patients who are receiving skilled care from licensed nurse referred by 
                                    Affinity Home Care. Registered nurses are available to make visits to the patient's home for an additional cost when
                                    a certified nursing assistant or home health aide is referred.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 15, marginTop: 20}}>
                        
                    </View>
                </ScrollView>
            </ScrollView>
        );
    };

    closePAFForm() {
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    contentContainer: {backgroundColor: '#fff', 
        width: Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height 
    },
    btn: { alignContent: 'center', justifyContent: 'center', textAlign: 'center', width: 120, height: 35, borderRadius: 12 },
    btnBlue: { backgroundColor: '#b8d5ff' },
    btnRed: { backgroundColor: '#fc8d82' },
    btnGreen: { backgroundColor: '#aeffb2' },
    btnText: { fontSize: 17, color: '#000', textAlign: 'center', fontWeight: '700' }
});

export default PatientAdmissionFormScreen;