import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import DCNTimePicker from './DCNTimePicker';

class DCNTimeTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            week: this.props.week,
            weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }
    }

    dateFomateMD = (date) => {
        return moment(new Date(date)).format("M/DD");
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
                <View key={i} style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> {this.dateFomateMD(this.state.week[i])} </Text></View>
            )
        }
        return weekHeader;
    }

    render() {
        const state = this.state;
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'column', borderColor: '#000', borderWidth: 0, paddingLeft: 20}}>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1, borderTopWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Year: 2019</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            {this.createTableHeader()}
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Date of Service</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            {this.createTableDateRow()}
                        </View>
                    </View>

                    <View>
                        <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                            <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time In</Text></View>
                            <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                            <View style={{width:170, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={{fontSize: 20, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}}>Time out</Text></View>
                            <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                                <View style={styles.DCNTimeCellContainer}><DCNTimePicker></DCNTimePicker></View>
                            </View>
                        </View>
                    </View>
                    
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
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> </Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> </Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> </Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> </Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> </Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> </Text></View>
                            <View style={styles.DCNTimeCellContainer}><Text style={styles.DCNTimeCellText}> </Text></View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    addSplitShift() {
        alert('You clicked add split shift button!');
    }
}

const styles = StyleSheet.create({
    DCNTimeCellContainer: {flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000', height: 35, width: 70}, 
    DCNTimeCellText: {fontSize: 20, textAlign: 'center', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}, 
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