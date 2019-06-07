import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import DCNTimePicker from './DCNTimePicker';
import { dateFomateMD } from '../../../helpers/AFDate';

class DCNTimeTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            week: this.props.week,
            weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            TimeInOutLength: global.TimeInOutLength ? global.TimeInOutLength : 0,
        }
        this.initTimeSheet();
    }

    initTimeSheet = () => {
        global.TimeInOutLength = 0;
        global.TimeIn_1_Arr = global.TimeIn_1_Arr ? global.TimeIn_1_Arr : ['', '', '', '', '', '', ''];
        global.TimeIn_2_Arr = global.TimeIn_2_Arr ? global.TimeIn_2_Arr : ['', '', '', '', '', '', ''];
        global.TimeIn_3_Arr = global.TimeIn_3_Arr ? global.TimeIn_3_Arr : ['', '', '', '', '', '', ''];
        global.TimeIn_4_Arr = global.TimeIn_4_Arr ? global.TimeIn_4_Arr : ['', '', '', '', '', '', ''];
        global.TimeOut_1_Arr = global.TimeOut_1_Arr ? global.TimeOut_1_Arr : ['', '', '', '', '', '', ''];
        global.TimeOut_2_Arr = global.TimeOut_2_Arr ? global.TimeOut_2_Arr : ['', '', '', '', '', '', ''];
        global.TimeOut_3_Arr = global.TimeOut_3_Arr ? global.TimeOut_3_Arr : ['', '', '', '', '', '', ''];
        global.TimeOut_4_Arr = global.TimeOut_4_Arr ? global.TimeOut_4_Arr : ['', '', '', '', '', '', ''];
        global.HoursPerDay_Arr = global.HoursPerDay_Arr ? global.HoursPerDay_Arr : [0, 0, 0, 0, 0, 0, 0];
    }

    createTableHeader = () => {
        var weekDays = this.state.weekDays;
        var weekHeader = [];
        for (var i = 0; i < weekDays.length; i++) {
            weekHeader.push(
                <View key={i} style={styles.DCNTimeCellContainer}><Text style={{fontSize: 20, fontWeight: '600', textAlign: 'center', color: '#000', marginTop: 'auto', marginBottom: 'auto'}}>{weekDays[i]}</Text></View>
            )
        }
        return weekHeader;
    }

    createTableDateRow = () => {
        var weekDays = this.state.weekDays;
        var weekHeader = [];
        for (var i = 0; i < weekDays.length; i++) {
            weekHeader.push(
                <View key={i} style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> {dateFomateMD(global.DCNWeek[i])} </Text></View>
            )
        }
        return weekHeader;
    }
    
    _renderTimeInOutSheet_2 = () => {
        if(this.state.TimeInOutLength > 0) {
            return (
                <View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time In 2</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_2_Arr[0]} timeType={"timeIn2"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_2_Arr[1]} timeType={"timeIn2"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_2_Arr[2]} timeType={"timeIn2"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_2_Arr[3]} timeType={"timeIn2"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_2_Arr[4]} timeType={"timeIn2"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_2_Arr[5]} timeType={"timeIn2"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_2_Arr[6]} timeType={"timeIn2"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time Out 2</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_2_Arr[0]} timeType={"timeOut2"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_2_Arr[1]} timeType={"timeOut2"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_2_Arr[2]} timeType={"timeOut2"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_2_Arr[3]} timeType={"timeOut2"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_2_Arr[4]} timeType={"timeOut2"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_2_Arr[5]} timeType={"timeOut2"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_2_Arr[6]} timeType={"timeOut2"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    _renderTimeInOutSheet_3 = () => {
        if(this.state.TimeInOutLength > 1) {
            return (
                <View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time In 3</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_3_Arr[0]} timeType={"timeIn3"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_3_Arr[1]} timeType={"timeIn3"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_3_Arr[2]} timeType={"timeIn3"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_3_Arr[3]} timeType={"timeIn3"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_3_Arr[4]} timeType={"timeIn3"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_3_Arr[5]} timeType={"timeIn3"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_3_Arr[6]} timeType={"timeIn3"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time Out 3</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_3_Arr[0]} timeType={"timeOut3"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_3_Arr[1]} timeType={"timeOut3"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_3_Arr[2]} timeType={"timeOut3"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_3_Arr[3]} timeType={"timeOut3"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_3_Arr[4]} timeType={"timeOut3"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_3_Arr[5]} timeType={"timeOut3"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_3_Arr[6]} timeType={"timeOut3"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    _renderTimeInOutSheet_4 = () => {
        if(this.state.TimeInOutLength > 2) {
            return (
                <View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time In 4</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_4_Arr[0]} timeType={"timeIn4"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_4_Arr[1]} timeType={"timeIn4"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_4_Arr[2]} timeType={"timeIn4"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_4_Arr[3]} timeType={"timeIn4"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_4_Arr[4]} timeType={"timeIn4"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_4_Arr[5]} timeType={"timeIn4"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_4_Arr[6]} timeType={"timeIn4"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time Out 4</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_4_Arr[0]} timeType={"timeOut4"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_4_Arr[1]} timeType={"timeOut4"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_4_Arr[2]} timeType={"timeOut4"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_4_Arr[3]} timeType={"timeOut4"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_4_Arr[4]} timeType={"timeOut4"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_4_Arr[5]} timeType={"timeOut4"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                            <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_4_Arr[6]} timeType={"timeOut4"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    calSum = () => {
        var all = 0;
        for(var i = 0; i < global.HoursPerDay_Arr.length; i++) {
            all += global.HoursPerDay_Arr[i] ? global.HoursPerDay_Arr[i] : 0;
        }
        global.WeekTotalHours = all; // DB - WeekTotalHours
        this.setState({ WeekTotalHours: all});
        this.props.WeekTotalHours();
    }

    render() {
        const state = this.state;
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'column', borderColor: '#000', borderWidth: 0, paddingLeft: 20}}>
                    {/* =============== ----------- Day of Week ------------ =============== */}
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1, borderTopWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Year: 2019</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            {this.createTableHeader()}
                        </View>
                    </View>
                    {/* ================= ---------- Date of Month --------- ================= */}
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Date of Service</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            {this.createTableDateRow()}
                        </View>
                    </View>
                    {/* ================= ---------- TimeIn/TimeOut ---------- ================ */}
                    {/* ------ 1 ------ TimeIn1/TimeOut1 ------------ */}
                    <View>
                        <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                            <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time In</Text></View>
                            <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_1_Arr[0]} timeType={"timeIn1"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_1_Arr[1]} timeType={"timeIn1"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_1_Arr[2]} timeType={"timeIn1"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_1_Arr[3]} timeType={"timeIn1"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_1_Arr[4]} timeType={"timeIn1"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_1_Arr[5]} timeType={"timeIn1"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeIn_1_Arr[6]} timeType={"timeIn1"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                            <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time Out</Text></View>
                            <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_1_Arr[0]} timeType={"timeOut1"} timeIndex={0} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_1_Arr[1]} timeType={"timeOut1"} timeIndex={1} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_1_Arr[2]} timeType={"timeOut1"} timeIndex={2} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_1_Arr[3]} timeType={"timeOut1"} timeIndex={3} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_1_Arr[4]} timeType={"timeOut1"} timeIndex={4} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_1_Arr[5]} timeType={"timeOut1"} timeIndex={5} selectTime={this.calSum}></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker defaultTime={global.TimeOut_1_Arr[6]} timeType={"timeOut1"} timeIndex={6} selectTime={this.calSum}></DCNTimePicker></View>
                            </View>
                        </View>
                    </View>
                    {/* ------ 2 ------ TimeIn2/TimeOut2 ------------ */}
                    { this._renderTimeInOutSheet_2() }
                    {/* ------ 3 ------ TimeIn3/TimeOut3 ------------ */}
                    { this._renderTimeInOutSheet_3() }
                    {/* ------ 4 ------ TimeIn4/TimeOut4 ------------ */}
                    { this._renderTimeInOutSheet_4() }
                    {/* ==================== --------- Hourly Per Day --------- =================== */}
                    <View>
                        <TouchableOpacity style={{position: 'absolute', top: -12, left: -25}}
                            onPress={() => this.addSplitShift()}
                        >
                            <Image style={{width: 25, height: 25}} source={require('../../../assets/img/icon-plus-o.jpg')} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto', fontWeight: '600'}}>Hours per Day</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}>{ global.HoursPerDay_Arr[0] ? global.HoursPerDay_Arr[0] : '' }</Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}>{ global.HoursPerDay_Arr[1] ? global.HoursPerDay_Arr[1] : '' }</Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}>{ global.HoursPerDay_Arr[2] ? global.HoursPerDay_Arr[2] : '' }</Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}>{ global.HoursPerDay_Arr[3] ? global.HoursPerDay_Arr[3] : '' }</Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}>{ global.HoursPerDay_Arr[4] ? global.HoursPerDay_Arr[4] : '' }</Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}>{ global.HoursPerDay_Arr[5] ? global.HoursPerDay_Arr[5] : '' }</Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}>{ global.HoursPerDay_Arr[6] ? global.HoursPerDay_Arr[6] : '' }</Text></View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    addSplitShift = () => {
        var newLength = parseInt(this.state.TimeInOutLength);
        console.log('before==', newLength);
        if(newLength < 4) {
            newLength = newLength + 1;
        }
        console.log('after==', newLength);
        global.TimeInOutLength = newLength; // DB-assist
        this.setState({ TimeInOutLength: newLength });
    }
}

const styles = StyleSheet.create({
    DCNTimeCellContainer: {flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000', height: 35, width: 70}, 
    DCNTimeCellText: {fontSize: 17, textAlign: 'center', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}, 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1962dd',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})

export default DCNTimeTable;