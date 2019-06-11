import React from 'react';
import { ScrollView, View, Image, Text, TextInput, 
    TouchableOpacity, StyleSheet, Picker, Platform, PickerIOS } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown-updated';

import DailyCareNotesTab from './TabScreens/DailyCareNotesTab';
import AssignmentSheetTab from './TabScreens/AssignmentSheetTab';
import PlanOfCareTab from './TabScreens/PlanOfCareTab';
import CONSTS from '../../helpers/Consts';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import { getCurrentMonthString, convert2mYStr2YYYYMM, getFullMonWeeksArr, getCurrentWeekIndex } from '../../helpers/AFDate';

class ControlPanelScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            spinner: false,
            client: 'first',
            clientId: global.clientArr[0].value,
            choosenTab: 0,
            clientArr: global.clientArr, 
            arr: [{label: 'First', value: '123'}, {label: 'Second', value: '456'}],
        }; 
        this.initControlPanel();
    }

    initControlPanel = () => {
        global.client = global.clientArr[0];
        global.ClientId = global.client.value;
        global.ClientName = global.client.label;
        // ---- default global selected (current) YYYY MM DD
        global.selectedMonth = this.getCurrentYYYYDD();
        global.selectedWeekIndex = getCurrentWeekIndex() ? getCurrentWeekIndex() : 0
        global.selectedWeek = getFullMonWeeksArr(global.selectedMonth)[global.selectedWeekIndex];
    }

    getCurrentYYYYDD() {
        var today = new Date();
        return today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1))
    }

    selectClient = (value, index) => {
        this.setState({client: value}); 
        global.ClientId = value; // DB - ClientId
        global.client = global.clientArr[index];
        this.DCNTab.fetchDCNItems();
    }

    render() {
        var clients = this.state.clientArr;
        var clientPickerItems = [];
        for (var i=0; i<clients.length; i++) {
            clientPickerItems.push(
                <Picker.Item key={i} label={clients[i].label} value={clients[i].value} />
            );
        }

        return (
            <ScrollView style={styles.background}>
                <Spinner 
                    visible={this.state.spinner} 
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={{marginTop: Platform.OS == 'ios' ? 50 : 0}}>
                    <View style={{}}>
                        <View style={{flexDirection: 'row-reverse'}}>
                            <TouchableOpacity onPress={() => this.toggleMenu()}>
                                <Image style={{width: 40, height: 40}} source={require('../../assets/img/icon-menu.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Control Panel</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 50}}>
                        <Text style={styles.label}>Choose a Client</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.client}
                                style={{height: '100%', width: '100%'}}
                                onValueChange={(itemValue, itemIndex) => this.selectClient(itemValue, itemIndex)}>
                                { clientPickerItems }
                            </Picker>
                            <View style={{top: 7}}>
                                <Image style={{width: 20, height: 20, left: -35}} source={require('../../assets/img/icon-arrow-down.png')} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{}}>
                    <View style={{flex: 2, flexDirection: 'row', paddingTop: 15, paddingBottom: 15}}>
                        <TouchableOpacity 
                            style={ this.state.choosenTab == 0 ? [styles.tabButton, styles.activeTab] : styles.tabButton }
                            onPress={() => this.chooseTab(0)}
                            navigation={this.props.navigation}
                            >
                            <Text style={styles.tabButtonText}>Daily Care Notes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={ this.state.choosenTab == 1 ? [styles.tabButton, styles.activeTab] : styles.tabButton }
                            onPress={() => this.chooseTab(1)}
                            >
                            <Text style={styles.tabButtonText}>Assignment Sheet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={ this.state.choosenTab == 2 ? [styles.tabButton, styles.activeTab] : styles.tabButton }
                            onPress={() => this.chooseTab(2)}
                            >
                            <Text style={styles.tabButtonText}>Plan of Care</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 11}}>
                        {this._switchTab()}
                    </View>
                </View>
            </ScrollView>
        );
    }

    toggleMenu() {
        alert('You clicked Menu!');
    }

    _switchTab(){
        switch (this.state.choosenTab) {
            case 0:
                return(<DailyCareNotesTab onRef={ref => (this.DCNTab = ref)} />);
                break;            
            case 1:
                return(<AssignmentSheetTab />);
                break;
            case 2:
                return(<PlanOfCareTab />);
                break;
        
            default:
                return(<DailyCareNotesTab onRef={ref => (this.DCNTab = ref)} />);
                break;
        }
    }

    chooseTab(tabId) {
        this.setState({choosenTab: tabId})
    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1, padding: 7, backgroundColor: '#fff', height: '100%'
    }, 
    toggleMenu: {
        position: 'absolute', right: 5, top: 5, width: 50, height: 50, borderColor: '#000', borderWidth: 1
    },
    toggleMenuImg: {
        width: 40, height: 40
    },
    toggleMenuText: {
        fontSize: 25
    },
    title: {
        position: 'absolute', alignItems: 'center', justifyContent: 'center', textAlign: 'center', 
        fontSize: 22, marginTop: 23, color: '#000', fontWeight: '700', width: '100%'
    },
    label: {
        color: '#000', fontSize: 15, margin: 7, flex: 4, borderColor: '#000'
    },
    pickerWrapper: {
        borderColor: '#000', borderWidth: 0.5, height: 35, color: '#000', flex: 8, flexDirection: 'row', marginRight: 10
    },
    picker: {
        height: 35, color: '#000', flex: 1
    },
    tabButton: {
        flex: 1, textAlign: 'center', borderColor: '#000', color: '#000', margin: 5, borderWidth: 0.7, height: 60, 
    },
    activeTab: {
        backgroundColor: '#ffe401', borderWidth: 0
    },
    tabButtonText: {
        fontSize: 13, alignItems: 'center', justifyContent: 'center', color: '#000', 
        textAlign: 'center', marginTop: 'auto', marginBottom: 'auto'
    }, 
    spinnerTextStyle: { color: '#FFF' }
})

export default ControlPanelScreen;