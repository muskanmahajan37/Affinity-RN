import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown-updated';
import { getCurrentMonthString, convert2mYStr2YYYYMM } from '../../helpers/AFDate';

class AFMonthSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.generateOptions(),
            defaultValue: this.props.defaultMonth ? this.props.defaultMonth : (getCurrentMonthString() + ' ' + new Date().getFullYear())
        }; 
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

    render() {
        return (
            <ModalDropdown
                options={this.state.options}
                defaultValue={this.state.defaultValue}
                style={this.props.style}
                textStyle={this.props.textStyle}
                dropdownStyle={this.props.dropdownStyle}
                dropdownTextStyle={this.props.dropdownTextStyle} 
                onSelect={(value) => this.selectedMonth(this.state.options[value])}
            >
            </ModalDropdown>
        );
    };

    selectedMonth = (value) => {
        var YYYYMM = convert2mYStr2YYYYMM(value);
        this.props.onSelectMonth(YYYYMM);
    }
}

export default AFMonthSelect;