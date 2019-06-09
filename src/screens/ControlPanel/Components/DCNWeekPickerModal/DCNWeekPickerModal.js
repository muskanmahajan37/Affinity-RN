import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableHighlight, ScrollView, Image } from 'react-native';
import { getMonthNum, getFullMonWeeksArr, getCurrentWeekIndex } from '../../../../helpers/AFDate';
import DCNWeekItem from './Components/DCNWeekItem';
import DCNSelectedWeekItem from './Components/DCNSelectedWeekItem';

class DCNWeekPickerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedMonth: this.props.selectedMonth,
            weeks: getFullMonWeeksArr(this.props.selectedMonth),
            selectedWeek: [], 
            selectedWeekIndex: this.props.selectedWeekIndex, 
            cdate: new Date().getDate(),
            cmonth: new Date().getMonth() + 1,
            cyear: new Date().getFullYear(),
            currentMonWeeks: [],
            lastMonWeek: [],
            nextMonWeek: [],
            showDropdownMenu: false
        };
        // global.selectedMonth = this.props.selectedMonth;
        global.selectedWeekIndex = this.props.selectedWeekIndex;
        global.selectedWeek = this.state.weeks[this.props.selectedWeekIndex];
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    selectWeek = (index) => {
        var reweeks = getFullMonWeeksArr(global.selectedMonth);
        this.setState({ weeks: reweeks, selectedWeekIndex: index, selectedWeek: reweeks[index], modalVisible: false });
        // global.selectedMonth = this.state.selectedMonth;
        global.selectedWeek = reweeks[index];
        global.selectedWeekIndex = index;
    }

    render() {
        var weeks = getFullMonWeeksArr(this.props.selectedMonth);
        var itemArr = [];
        for (var j = 0; j < weeks.length; j++) {
            itemArr.push(
                <DCNWeekItem
                    key={j}
                    weekIndex={j}
                    week={weeks[j]}
                    selectWeek={(index)=>this.selectWeek(index)}
                ></DCNWeekItem> 
            );
        }
        return (
            <View style={{width: '100%'}}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{backgroundColor: '#000000bd', width: '100%', height: '100%', padding: 40}}>
                        <View style={{borderColor: '#000', borderWidth: 1, backgroundColor: '#fff', width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>
                            <ScrollView>
                                { itemArr }
                            </ScrollView>
                            <TouchableOpacity
                                style={{position: 'absolute', left: -10, top: -10}}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Image style={{width: 40, height: 40}} source={require('../../../../assets/img/icon-cancel-o.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                    style={{width: '100%', height: '100%'}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <DCNSelectedWeekItem week={global.selectedWeek}></DCNSelectedWeekItem>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    DCNItemWrapper: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2,
        padding: 2
    },
    DCNItemText: {
        flex: 3,
        color: '#000',
        fontSize: 17
    },
    DCNItemButton: {
        flex: 1,
        backgroundColor: '#0136ff',
        borderRadius: 8,
        height: 25
    },
    DCNItemButtonText: {
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        color: '#fff'
    }
})

export default DCNWeekPickerModal;