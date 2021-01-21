import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

class HurricaneSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render () {
        return (
            <View style={{ marginTop: 15 }}>
                <View style={styles.rowBox}>
                    <Text style={styles.boldText}>8. Hurricane/Disaster Service Plan and Special Needs Registration </Text>
                </View>
                <View style={styles.rowBox}>
                    <View style={styles.rowBox}>
                        <Text style={[styles.boldFont, {marginLeft: 40}]}>Does the Patient: </Text>
                        <View style={{marginLeft: 40}}>
                            <View style={styles.rowBox}>
                                <TouchableOpacity onPress={() => this.setState({evacuation: !this.state.evacuation})}>
                                    { this.state.evacuation ? <Image style={styles.miniCheckbox} source={require('../../../assets/img/checked-checkbox.png')} /> : <Image style={styles.miniCheckbox} source={require('../../../assets/img/unchecked-checkbox.png')} /> }
                                </TouchableOpacity>
                                <Text style={[styles.commonText, {marginLeft: 5, marginRight: 5}]}>live in an evacuation area?</Text>
                                <TouchableOpacity onPress={() => this.setState({specialRegistration: !this.state.specialRegistration})}>
                                    { this.state.specialRegistration ? <Image style={styles.miniCheckbox} source={require('../../../assets/img/checked-checkbox.png')} /> : <Image style={styles.miniCheckbox} source={require('../../../assets/img/unchecked-checkbox.png')} /> }
                                </TouchableOpacity>
                                <Text style={[styles.commonText, {marginLeft: 5, marginRight: 5}]}>desire Special Needs Registration?</Text>
                            </View>
                            <View style={styles.rowBox}>
                                <TouchableOpacity onPress={() => this.setState({request_continuation: !this.state.request_continuation})}>
                                    { this.state.request_continuation ? <Image style={styles.miniCheckbox} source={require('../../../assets/img/checked-checkbox.png')} /> : <Image style={styles.miniCheckbox} source={require('../../../assets/img/unchecked-checkbox.png')} /> }
                                </TouchableOpacity>
                                <Text style={[styles.commonText, {marginLeft: 5, marginRight: 5}]}>request continuation of services during a hurricane or disaster?</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rowBox}>
                        <Text style={[styles.boldFont, {marginLeft: 40}]}>Patient Plans to take one of the following actions: </Text>
                        <View style={[styles.rowBox, {marginLeft: 40}]}>
                            <TouchableOpacity onPress={() => this.setState({remain_home: !this.state.remain_home})}>
                                { this.state.remain_home ? <Image style={styles.miniCheckbox} source={require('../../../assets/img/checked-checkbox.png')} /> : <Image style={styles.miniCheckbox} source={require('../../../assets/img/unchecked-checkbox.png')} /> }
                            </TouchableOpacity>
                            <Text style={[styles.commonText, {marginLeft: 5, marginRight: 5}]}> remain at home (can forego services during that time period) </Text>
                        </View>
                        <View style={[styles.rowBox, {marginLeft: 40}]}>
                            <TouchableOpacity onPress={() => this.setState({gotoFamily: !this.state.gotoFamily})}>
                                { this.state.gotoFamily ? <Image style={styles.miniCheckbox} source={require('../../../assets/img/checked-checkbox.png')} /> : <Image style={styles.miniCheckbox} source={require('../../../assets/img/unchecked-checkbox.png')} /> }
                            </TouchableOpacity>
                            <Text style={[styles.commonText, {marginLeft: 5, marginRight: 5}]}> go to a family/friend: Name </Text>
                            <TextInput style={[styles.inputText, {width: 100}]} />
                            <Text style={styles.commonText}>Address</Text>
                            <TextInput style={[styles.inputText, {width: 200}]} />
                            <Text style={styles.commonText}>Phone</Text>
                            <TextInput style={[styles.inputText, {width: 100}]} />
                        </View>
                        <View style={[styles.rowBox, {marginLeft: 40}]}>
                            <TouchableOpacity onPress={() => this.setState({gotoShelter: !this.state.gotoShelter})}>
                                { this.state.gotoShelter ? <Image style={styles.miniCheckbox} source={require('../../../assets/img/checked-checkbox.png')} /> : <Image style={styles.miniCheckbox} source={require('../../../assets/img/unchecked-checkbox.png')} /> }
                            </TouchableOpacity>
                            <Text style={[styles.commonText, {marginLeft: 5, marginRight: 5}]}> go to a shelter </Text>
                            <TextInput style={[styles.inputText, {width: 150}]} />
                        </View>
                        <View style={[styles.rowBox, {marginLeft: 40}]}>
                            <TouchableOpacity onPress={() => this.setState({gotoHospital: !this.state.gotoHospital})}>
                                { this.state.gotoHospital ? <Image style={styles.miniCheckbox} source={require('../../../assets/img/checked-checkbox.png')} /> : <Image style={styles.miniCheckbox} source={require('../../../assets/img/unchecked-checkbox.png')} /> }
                            </TouchableOpacity>
                            <Text style={[styles.commonText, {marginLeft: 5, marginRight: 5}]}> go to a Hospital or an Acute Care facility </Text>
                            <TextInput style={[styles.inputText, {width: 200}]} />
                        </View>
                        <View style={[styles.rowBox, {marginLeft: 40}]}>
                            <View style={[styles.boldText, styles.dot]}></View>
                            <Text style={[styles.commonText, {marginLeft: 10, marginRight: 5}]}> Patient received a copy of Patient Instructions in the Event of an Environmental Emergency and Hurricane Preparedness. </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowBox: { flexWrap: 'wrap', flexDirection: 'row' }, 
    boldFont: { flexDirection: 'column', fontSize: 16, fontWeight: '600', color: '#000' },
    boldText: { flexDirection: 'column', fontSize: 16, fontWeight: '600', color: '#000', borderBottomWidth: 1, borderColor: '#000' },
    commonText: { flexDirection: 'column', fontSize: 16, color: '#000' }, 
    inputText: { flexDirection: 'column', fontSize: 16, paddingTop: 0, paddingBottom: 0, paddingLeft: 5, paddingRight: 5, minWidth: 100, borderBottomWidth: 1, borderBottomColor: '#000', height: 25 }, 
    dot: { position: 'absolute', flexDirection: 'row', width: 7, height: 7, backgroundColor: '#000', 
            borderRadius: 15, marginTop: 7, marginRight: 7, marginLeft: 2 
    }, 
    miniCheckbox: {width: 15, height: 15, top: 4}, 
});

export default HurricaneSection;