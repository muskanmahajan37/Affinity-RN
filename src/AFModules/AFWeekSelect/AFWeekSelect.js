import React, { Component } from 'react';
import { View, Text, TouchableOpacity, styleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import AFWeekItem from './Components/AFWeekItem';
import AFWeekDropdownItem from './Components/AFWeekDropdownItem';
import { getMonthNum, getFullMonWeeksArr } from '../../helpers/AFDate';

class AFWeekSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: this.props.selectedMonth,
            weeks: getFullMonWeeksArr(this.props.selectedMonth),
            cdate: new Date().getDate(),
            cmonth: new Date().getMonth() + 1,
            cyear: new Date().getFullYear(),
            currentMonWeeks: [],
            lastMonWeek: [],
            nextMonWeek: [],
            showDropdownMenu: false
        };
    }

    render() {
        var weeks = getFullMonWeeksArr(this.props.selectedMonth);

        return (
            <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderColor: 1, zIndex: 4}}>
                <View style={{flex: 1}}>
                    <AFWeekItem
                        week={this.props.selectedWeek ? this.props.selectedWeek : getFullMonWeeksArr(this.props.selectedMonth)[0]}
                        onPressItem={this.toggleDropdown}
                    ></AFWeekItem>
                </View>
                {this.renderDropdown()}
            </View>
        )
    }

    toggleDropdown = () => {
        this.setState({showDropdownMenu: !this.state.showDropdownMenu});
    }

    renderDropdown = () => {
        var weeks = getFullMonWeeksArr(this.props.selectedMonth);
        var itemArr = [];
        for (var j = 0; j < weeks.length; j++) {
            itemArr.push(
                <TouchableOpacity 
                    key={j} style={{backgroundColor: '#fff', zIndex: 10000}}
                    onPress={(j)=>alert("here")}
                    >
                   <AFWeekDropdownItem
                        weekIndex={j}
                        week={weeks[j]}
                    ></AFWeekDropdownItem> 
                </TouchableOpacity>
            );
        }
        if(this.state.showDropdownMenu) {
            return (
                <View 
                    style={{position: 'absolute', top: 35, flex: 1, flexDirection: 'column', width: '100%', 
                    zIndex: 100, background: '#fff', borderColor: '#000', borderWidth: 0, 
                    shadowColor: '#000', shadowOffset: { width: 0, height: 1,}, shadowOpacity: 0.22,
                    shadowRadius: 2.22, elevation: 3}}
                >
                    <ScrollView
                        style={{position: 'absolute', flex: 1, flexDirection: 'column', width: '100%', 
                                zIndex: 1000, background: '#fff', borderColor: '#000', borderWidth: 0, 
                                shadowColor: '#000', shadowOffset: { width: 0, height: 1,}, shadowOpacity: 0.22,
                                shadowRadius: 2.22, elevation: 3}}
                    >
                        { itemArr }
                    </ScrollView>
                </View>
            );
        } else {
            return null;
        }
    }

    onPressDropdownItem(index) {
        alert(index);
    }
}

export default AFWeekSelect;