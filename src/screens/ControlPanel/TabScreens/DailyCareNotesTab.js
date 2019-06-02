import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown-updated';
import DCNItem from '../Components/DCNItem';
import DCNWeekPickerModal from '../Components/DCNWeekPickerModal/DCNWeekPickerModal';
// import AFWeekSelect from '../../../AFModules/AFWeekSelect/AFWeekSelect';
import { getCurrentMonthString, convert2mYStr2YYYYMM, getFullMonWeeksArr, getCurrentWeekIndex } from '../../../helpers/AFDate';


class DailyCareNotesTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filter: 'Active', 
            options: this.generateOptions(),
            defaultValue: (getCurrentMonthString() + ' ' + new Date().getFullYear()), 
            selectedMonth: this.getCurrentYYYYDD(),
            selectedWeek: [],
            selectedWeekIndex: getCurrentWeekIndex() ? getCurrentWeekIndex() : 0,
            month: '',
            week: '',
            dataSource: [{title: 'first', key: 'item1'}, {title: 'second', key: 'item2'}, {title: 'third', key: 'item3'}],
        }; 
        global.selectedMonth = this.getCurrentYYYYDD();
        global.selectedWeekIndex = getCurrentWeekIndex() ? getCurrentWeekIndex() : 0
        global.selectedWeek = getFullMonWeeksArr(global.selectedMonth)[global.selectedWeekIndex];
        // this.selectedMonth(this.state.selectedMonth);
    }

    getCurrentYYYYDD() {
        var today = new Date();
        return today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1))
    }

    generateOptions() {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var cyear = new Date().getFullYear();
        var options = [];
        for (var i = 0; i < months.length; i++) {
            options.push(months[i] + ' ' + cyear);
        }
        return options;
    }

    selectedMonth = (value) => {
        var YYYYMM = convert2mYStr2YYYYMM(value);
        global.selectedMonth = YYYYMM;
        this.setState({selectedMonth: YYYYMM});
        this.setState({selectedWeek: getFullMonWeeksArr(YYYYMM)[0]});
        global.selectedWeek = getFullMonWeeksArr(YYYYMM)[0];
    }

    render() {
        return (
            <View style={{flex: 11, zIndex: 1}}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <Text style={styles.filterText}>Fitler</Text>
                    <View style={styles.filterPickerWrapper}>
                        <ModalDropdown
                            options={['All', 'Active', 'Sent', 'Cancelled']}
                            defaultValue={'Active'}
                            style={[styles.filterPicker, {padding: 5}]}
                            textStyle={{fontSize: 18, color: '#000'}}
                            dropdownStyle={{width: '40%', shadowColor: '#000', shadowOffset: { width: 0, height: 1,}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3}}
                            dropdownTextStyle={{fontSize: 18, color: '#000'}}
                        >
                        </ModalDropdown>
                        <View style={{flex: 1, top: 7}}>
                            <Image style={{width: 20, height: 20}} source={require('../../../assets/img/icon-arrow-down.png')} />
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{flex: 1, color: '#000', fontSize: 18, margin: 7, flexDirection: 'row', textAlign: 'right'}}>Select a Week of Service</Text>
                    <View style={{width: 150, height: 35, backgroundColor: '#ddd', color: '#000', flexDirection: 'row', marginRight: 10, marginLeft: 10}}>
                        <ModalDropdown
                            options={this.state.options}
                            defaultValue={this.state.defaultValue}
                            style={{height: 35, color: '#000', flex: 1, padding: 5}}
                            textStyle={{fontSize: 18, color: '#000', textAlign: 'center'}}
                            dropdownStyle={{width: 150, shadowColor: '#000', shadowOffset: { width: 0, height: 1,}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3}}
                            dropdownTextStyle={{fontSize: 18, color: '#000'}} 
                            onSelect={(value) => this.selectedMonth(this.state.options[value])}
                        >
                        </ModalDropdown>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', zIndex: 2}}>
                    <View style={styles.weekPickerWrapper}>
                        <DCNWeekPickerModal selectedWeekIndex={this.state.selectedWeekIndex} selectedMonth={global.selectedMonth}></DCNWeekPickerModal>
                    </View>
                </View>
                <View style={{flex: 7, flexDirection: 'row'}}>
                    <View style={{width: '100%'}}>
                        <View style={{width: '100%'}}>
                            <FlatList 
                                data={this.state.dataSource}
                                renderItem={({item}) => <DCNItem title={item.title} btnTitle={"Open"}></DCNItem>}
                            />
                        </View>
                        <View style={{width: '100%', alignItems: 'flex-end', paddingRight: 10, paddingTop: 5}}>
                            <View style={{width: '25%', padding: 2}}>
                                <TouchableOpacity
                                    style={styles.DCNCreateButton}
                                    onPress={this.props.createDCN}
                                >
                                    <Text style={styles.DCNCreateButtonText}>Create New</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View> 
            </View>
        );
    };
}

const styles = StyleSheet.create({
    filterText: {
        color: '#000', fontSize: 18, flex: 6, flexDirection: 'row', textAlign: 'right', paddingTop: 5
    },
    filterPickerWrapper: {
        height: 35, backgroundColor: '#ddd', color: '#000', flex: 6, flexDirection: 'row', marginRight: 10, marginLeft: 10
    },
    filterPicker: {
        height: 35, color: '#000', flex: 5
    },
    weekPickerWrapper: {
        height: 35, backgroundColor: '#ddd', color: '#000', flex: 3, flexDirection: 'row', marginRight: 10, marginLeft: 10
    },
    weekPicker: {
        height: 35, color: '#000', flex: 1
    },
    DCNCreateButton: {
        backgroundColor: '#0e5d02', borderRadius: 8, height: 25, width: '100%'
    },
    DCNCreateButtonText: {
        textAlign: 'center', alignContent: 'center', justifyContent: 'center', color: '#fff'
    }
})

export default DailyCareNotesTab;