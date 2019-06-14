import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableHighlight, Picker, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { calcHoursPerDay, convertHour } from '../../../helpers/AFDate';

class DCNTimePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time : this.props.defaultTime ? this.props.defaultTime : '',
            timeType: this.props.timeType,
            timeIndex: this.props.timeIndex,
        }
    }
    
    selectTime = (selectedTime) => {
        switch (this.state.timeType) {
            // ------ TimeIn
            case 'timeIn1' : 
                if( convertHour(global.TimeOut_1_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_1_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_1_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeIn2' : 
                if( convertHour(global.TimeOut_2_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_2_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_2_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeIn3' : 
                if( convertHour(global.TimeOut_3_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_3_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_3_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeIn4' : 
                if( convertHour(global.TimeOut_4_Arr[this.state.timeIndex]) && convertHour(selectedTime) >= convertHour(global.TimeOut_4_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeIn_4_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            // ------ TimeOut
            case 'timeOut1' : 
                if( convertHour(global.TimeIn_1_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_1_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeOut_1_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeOut2' : 
                if( convertHour(global.TimeIn_2_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_2_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeOut_2_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeOut3' : 
                if( convertHour(global.TimeIn_3_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_3_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
                } else {
                    global.TimeOut_3_Arr[this.state.timeIndex] = selectedTime;
                    this.setState({time: selectedTime});
                }
                break;
            case 'timeOut4' : 
                if( convertHour(global.TimeIn_4_Arr[this.state.timeIndex]) && convertHour(selectedTime) <= convertHour(global.TimeIn_4_Arr[this.state.timeIndex]) ) {
                    // Alert.alert('', 'Invalid Input Time! Please select correct time.');
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
        return (
            <View style={{}}>
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