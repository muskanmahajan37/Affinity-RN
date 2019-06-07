import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableHighlight, Picker, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { calcHoursPerDay, convertHour } from '../../../helpers/AFDate';

class DCNTimePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time : this.props.defaultTime ? parseInt(this.props.defaultTime) : '',
            itemList: ['--', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12pm', '01pm', '02pm', '03pm', '04pm', '05pm', '06pm', '07pm', '08pm', '09pm', '10pm', '11pm', '00am'],
            timeList: [
                {label: '--', value: ''},
                {label: '01am', value: 1},
                {label: '02am', value: 2},
                {label: '03am', value: 3},
                {label: '04am', value: 4},
                {label: '05am', value: 5},
                {label: '06am', value: 6},
                {label: '07am', value: 7},
                {label: '08am', value: 8},
                {label: '09am', value: 9},
                {label: '10am', value: 10},
                {label: '11am', value: 11},
                {label: '12pm', value: 12},
                {label: '01pm', value: 13},
                {label: '02pm', value: 14},
                {label: '03pm', value: 15},
                {label: '04pm', value: 16},
                {label: '05pm', value: 17},
                {label: '06pm', value: 18},
                {label: '07pm', value: 19},
                {label: '08pm', value: 20},
                {label: '09pm', value: 21},
                {label: '10pm', value: 22},
                {label: '11pm', value: 23},
                {label: '00am', value: 0},
            ],
            timeType: this.props.timeType,
            timeIndex: this.props.timeIndex,
        }
    }
    
    selectTime = (selectedTime) => {
        switch (this.state.timeType) {
            // ------ TimeIn
            case 'timeIn1' : 
                if( convertHour(global.TimeOut_1_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_1_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_1_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeIn2' : 
                if( convertHour(global.TimeOut_2_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_2_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_2_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeIn3' : 
                if( convertHour(global.TimeOut_3_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_3_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_3_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeIn4' : 
                if( convertHour(global.TimeOut_4_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_4_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_4_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            // ------ TimeOut
            case 'timeOut1' : 
                if( convertHour(global.TimeIn_1_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_1_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeOut_1_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeOut2' : 
                if( convertHour(global.TimeIn_2_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_2_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeOut_2_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeOut3' : 
                if( convertHour(global.TimeIn_3_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_3_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeOut_3_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeOut4' : 
                if( convertHour(global.TimeIn_4_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_4_Arr[this.state.timeIndex]) ) {
                    Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeOut_4_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
        }
        
        var HoursPerDay_1 = (global.TimeIn_1_Arr[this.state.timeIndex] && global.TimeOut_1_Arr[this.state.timeIndex]) ? calcHoursPerDay(global.TimeOut_1_Arr[this.state.timeIndex], global.TimeIn_1_Arr[this.state.timeIndex]) : 0;
        var HoursPerDay_2 = (global.TimeIn_2_Arr[this.state.timeIndex] && global.TimeOut_2_Arr[this.state.timeIndex]) ? calcHoursPerDay(global.TimeOut_2_Arr[this.state.timeIndex], global.TimeIn_2_Arr[this.state.timeIndex]) : 0;
        var HoursPerDay_3 = (global.TimeIn_3_Arr[this.state.timeIndex] && global.TimeOut_3_Arr[this.state.timeIndex]) ? calcHoursPerDay(global.TimeOut_3_Arr[this.state.timeIndex], global.TimeIn_3_Arr[this.state.timeIndex]) : 0;
        var HoursPerDay_4 = (global.TimeIn_4_Arr[this.state.timeIndex] && global.TimeOut_4_Arr[this.state.timeIndex]) ? calcHoursPerDay(global.TimeOut_4_Arr[this.state.timeIndex], global.TimeIn_4_Arr[this.state.timeIndex]) : 0;
        global.HoursPerDay_Arr[this.state.timeIndex] = HoursPerDay_1 + HoursPerDay_2 + HoursPerDay_3 + HoursPerDay_4;
        this.props.selectTime();
    }

    render() {
        // console.log('>>>>>>>>> default >>>>', this.state.time);
        // var list = this.state.itemList;
        // var timeArr = [];
        // for (var i=0; i<list.length; i++) {
        //     timeArr.push(
        //         <Picker.Item key={i} label={list[i]} value={list[i]} />
        //     );
        // }
        return (
            <View style={{}}>
                {/* <Picker 
                    selectedValue={this.state.itemList[this.state.time]}
                    style={{height: 35, width: 120, backgroundColor: 'transparent'}}
                    onValueChange={(itemValue, itemIndex) => {this.selectTime(itemValue, itemIndex)} }
                >
                    { timeArr }
                </Picker> */}
                <DatePicker
                    style={{width: 68, height: 35}}
                    date={this.state.time}
                    mode="time"
                    placeholder=" "
                    format="HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    androidMode="spinner"
                    is24Hour={true}
                    showIcon={false}
                    customStyles={{
                    dateInput: {
                        width: 68,
                        height: 35,
                        borderWidth: 0
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.selectTime(date);}}
                />
            </View>
        );
    };
}

export default DCNTimePicker;