import React from 'react';
import { ScrollView, View, Image, Text, TextInput, 
    TouchableOpacity, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown-updated';

import DailyCareNotesTab from './TabScreens/DailyCareNotesTab';
import AssignmentSheetTab from './TabScreens/AssignmentSheetTab';
import PlanOfCareTab from './TabScreens/PlanOfCareTab';

class ControlPanelScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            client: '',
            choosenTab: 0
        }; 
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={{flex: 3}}>
                    <View style={{flex: 2}}>
                        <View style={{flexDirection: 'row-reverse'}}>
                            <TouchableOpacity onPress={() => this.toggleMenu()}>
                                <Image style={{width: 40, height: 40}} source={require('../../assets/img/icon-menu.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Control Panel</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={styles.label}>Choose a Client</Text>
                        <View style={styles.pickerWrapper}>
                            <ModalDropdown 
                                options={['Mary Smith', 'Jamse Ganzil', 'Alex Krol', 'Roy Smir']}
                                style={{flex: 7, padding: 5}}
                                textStyle={{fontSize: 18, color: '#000'}}
                                dropdownStyle={{width: '60%', shadowColor: '#000', shadowOffset: { width: 0, height: 1,}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3}}
                                dropdownTextStyle={{fontSize: 18, color: '#000'}}
                            >
                            </ModalDropdown>
                            <View style={{flex: 1, top: 7}}>
                                <Image style={{width: 20, height: 20}} source={require('../../assets/img/icon-arrow-down.png')} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 13}}>
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
            </View>
        );
    }

    toggleMenu() {
        alert('You clicked Menu!');
    }

    gotoDCNScreen=() => {
        this.props.navigation.navigate('DailyCareNotes');
    }

    _switchTab(){
        switch (this.state.choosenTab) {
            case 0:
                return(<DailyCareNotesTab gotoDCNScreen={this.gotoDCNScreen} />);
                break;            
            case 1:
                return(<AssignmentSheetTab />);
                break;
            case 2:
                return(<PlanOfCareTab />);
                break;
        
            default:
                return(<DailyCareNotesTab gotoDCNScreen={this.gotoDCNScreen} />);
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
        flex: 1, textAlign: 'center', borderColor: '#000', color: '#000', margin: 5, borderWidth: 0.7,
    },
    activeTab: {
        backgroundColor: '#ffe401', borderWidth: 0
    },
    tabButtonText: {
        fontSize: 13, alignItems: 'center', justifyContent: 'center', color: '#000', 
        textAlign: 'center', marginTop: 'auto', marginBottom: 'auto'
    }
})

export default ControlPanelScreen;