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
            cdate: new Date().getDate(),
            cmonth: new Date().getMonth() + 1,
            cyear: new Date().getFullYear(),
            currentMonWeeks: [],
            lastMonWeek: [],
            nextMonWeek: [],
            showDropdownMenu: false
        };
        this.initWeekRows(this.props.selectedMonth);
    }

    initWeekRows(YYYYMM) {
        // alert(YYYYMM);
        var dd = new Date();
        var mm = moment(dd).format("YYYY-MM-DD");
        
        var sYear = YYYYMM.split('-')[0];
        var sMonthNum = Number(YYYYMM.split('-')[1]);
        
        var firstDate = moment(new Date(sYear, sMonthNum - 1, 1)).format("YYYY-MM-DD");
        var firstDD = Number(moment(new Date(sYear, sMonthNum - 1, 1)).format("DD"));
        var mfirst = moment(firstDate);
        var firstDay = mfirst.day();
        var lastDate = moment(new Date(sYear, sMonthNum, 0)).format("YYYY-MM-DD");
        var lastDD = Number(moment(new Date(sYear, sMonthNum, 0)).format("DD"));
        var mlast = moment(lastDate);
        var lastDay = mlast.day();

        var max_week = Math.ceil(mlast.date() / 7);
        
        // get all weeks of current month
        var arr_weeks = new Array(max_week);
        for (var k = 0; k < max_week; k++) {
            arr_weeks[k] = new Array();
        }
        for (var i = 1; i <= lastDD; i++) {
            var nthOfMon = Math.ceil((moment(moment(new Date(sYear, sMonthNum - 1, i)).format("YYYY-MM-DD")).date() + firstDay) / 7);
            // this.state.weeks.push(i);
            for (var j = 0; j < max_week; j++) {
                if (nthOfMon == j + 1) {
                    arr_weeks[j].push(i);
                }
            }
        }

        // get last week of last month
        var last_mon_week = new Array();
        var lmfirst = moment(moment(new Date(sYear, sMonthNum - 2, 1)).format("YYYY-MM-DD"));

        var llastDate = moment(new Date(sYear, sMonthNum - 1, 0)).format("YYYY-MM-DD");
        var llastDD = Number(moment(new Date(sYear, sMonthNum - 1, 0)).format("DD"));
        var mllast = moment(llastDate);
        var max_mlweek=  Math.ceil(mllast.date() / 7);

        var arr_mlweek = new Array();
        for (var l = 1; l <= llastDD; l++) {
            var nthOfMon = Math.ceil((moment(moment(new Date(sYear, sMonthNum - 2, l)).format("YYYY-MM-DD")).date() + lmfirst.day()) / 7);
            if (nthOfMon == max_mlweek) {
                arr_mlweek.push(l);
            }
            
        }
        this.state.lastMonWeek = arr_mlweek;

        // full current month weeks
        // --- first week fully
        for (var m = arr_mlweek.length - 1; m >= 0 ; m--) {
            arr_weeks[0].unshift(arr_mlweek[m]);
        }
        // --- last week fully
        var nextMonWeek = new Array();
        for (var n = 1; n <= 7 - arr_weeks[max_week - 1].length; n++) {
            nextMonWeek.push(n);
            arr_weeks[max_week - 1].push(n);
        }
        this.state.nextMonWeek = nextMonWeek;
        // this.state.currentMonWeeks = arr_weeks;
    }

    render() {
        // var weeks = this.state.currentMonWeeks;
        // var itemArr = [];
        // console.log('p=p=p=p=p=p=p', weeks.length);
        // for (var j = 0; j < weeks.length; j++) {
        //     itemArr.push(
        //         <View key={j} style={{backgroundColor: '#fff'}}>
        //             <AFWeekItem
        //                 week={weeks[j]}
        //                 isSubItem='true'
        //             ></AFWeekItem>
        //         </View>
        //     );
        // }
        var weeks = getFullMonWeeksArr(this.props.selectedMonth);

        return (
            <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderColor: 1, zIndex: 4}}>
                <View style={{flex: 1}}>
                    <AFWeekItem
                        week={weeks[0]}
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

    renderDropdown() {
        // this.initWeekRows(this.props.selectedMonth);
        // var weeks = this.state.currentMonWeeks;
        var weeks = getFullMonWeeksArr(this.props.selectedMonth);
        var itemArr = [];
        for (var j = 0; j < weeks.length; j++) {
            itemArr.push(
                <View key={j} style={{backgroundColor: '#fff', zIndex: 10000}}>
                    <AFWeekDropdownItem
                        week={weeks[j]}
                        onPressDropdownItem={this.onPressDropdownItem}
                    ></AFWeekDropdownItem>
                </View>
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
                    {/* <FlatList
                        style={{backgroundColor: '#fff', zIndex: 1000}}
                        data={this.state.currentMonWeeks}
                        renderItem={({item, index}) => <AFWeekItem week={item} value={index} isSubItem='true' opPress={(index) => this.onPressItem(index)}></AFWeekItem>}
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
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

    onPressDropdownItem = () => {
        alert('a');
    }
}



export default AFWeekSelect;