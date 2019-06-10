import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';

class DCNWorkTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            week: this.props.week,
            weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            Mobility_Walking_Moving_Flag: global.MobilityWalkingMovingFlag ? global.MobilityWalkingMovingFlag : [false, false, false, false, false, false, false],
            Bathing_Showering_Flag: global.BathingShoweringFlag ? global.BathingShoweringFlag : [false, false, false, false, false, false, false],
            Dressing_Flag: global.DressingFlag ? global.DressingFlag : [false, false, false, false, false, false, false],
            Toileting_Flag: global.ToiletingFlag ? global.ToiletingFlag : [false, false, false, false, false, false, false],
            Eating_Flag: global.EatingFlag ? global.EatingFlag : [false, false, false, false, false, false, false],
            Continence_Bladder_Bowel_Flag: global.ContinenceBladderBowelFlag ? global.ContinenceBladderBowelFlag : [false, false, false, false, false, false, false],
            Meal_Prep_Including_Flag: global.MealPrepIncludingFlag ? global.MealPrepIncludingFlag : [false, false, false, false, false, false, false],
            Laundry_Flag: global.LaundryFlag ? global.LaundryFlag : [false, false, false, false, false, false, false],
            Light_Housekeeping_Including_Flag: global.LightHousekeepingIncludingFlag ? global.LightHousekeepingIncludingFlag : [false, false, false, false, false, false, false],
        }
        // this.initDCNWorkFlags();
    }

    initDCNWorkFlags = () => {
        global.MobilityWalkingMovingFlag = [false, false, false, false, false, false, false]
        global.BathingShoweringFlag = [false, false, false, false, false, false, false]
        global.DressingFlag = [false, false, false, false, false, false, false]
        global.ToiletingFlag = [false, false, false, false, false, false, false]
        global.EatingFlag = [false, false, false, false, false, false, false]
        global.ContinenceBladderBowelFlag = [false, false, false, false, false, false, false]
        global.MealPrepIncludingFlag = [false, false, false, false, false, false, false]
        global.LaundryFlag = [false, false, false, false, false, false, false]
        global.LightHousekeepingIncludingFlag = [false, false, false, false, false, false, false]
    }

    DCNCheckedIcon = () => {
        return (<Image style={{width: 25, height: 25}} source={require('../../../assets/img/DCNCheckboxIcon.png')} />);
    }

    DCNUncheckedIcon = () => {
        // return (<Image style={{width: 25, height: 25, borderWidth: 1, borderColor: '#000'}} source={require('../../../assets/img/DCNCheckboxIcon.png')} />);
        return null;
    }

    createTableHeader = () => {
        var weekDays = this.state.weekDays;
        var weekHeader = [];
        for (var i = 0; i < weekDays.length; i++) {
            weekHeader.push(
                <View key={i} style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000', width: 70}}><Text style={{fontSize: 20, fontWeight: '600', textAlign: 'center', color: '#000', padding: 5}}>{weekDays[i]}</Text></View>
            )
        }
        return weekHeader;
    }

    set_DCN_Form_Row_Flag = (key, index) => {
        if (!this.validationForService(index)) return;
        var old_arr = this.getDCNRowArrFromKey(key);
        var new_arr = [];
        for (var i = 0; i < old_arr.length; i++) {
            if (i == index) {
                new_arr.push(!old_arr[i]);
            } else {
                new_arr.push(old_arr[i]);
            }
        }
        this.setState({[key]: new_arr});
        this.saveGlobalDCNWorkFlags(key, new_arr);
    }

    validationForService(index) {
        if (global.HoursPerDay_Arr[index]) {
            return true;
        } else {
            return false;
        }
    }

    getDCNRowArrFromKey = (key) => {
        var DCNRowArr = [];
        switch (key) {
            case 'Mobility_Walking_Moving_Flag': DCNRowArr = this.state.Mobility_Walking_Moving_Flag; break;
            case 'Bathing_Showering_Flag': DCNRowArr = this.state.Bathing_Showering_Flag; break;
            case 'Dressing_Flag': DCNRowArr = this.state.Dressing_Flag; break;
            case 'Toileting_Flag': DCNRowArr = this.state.Toileting_Flag; break;
            case 'Eating_Flag': DCNRowArr = this.state.Eating_Flag; break;
            case 'Continence_Bladder_Bowel_Flag': DCNRowArr = this.state.Continence_Bladder_Bowel_Flag; break;
            case 'Meal_Prep_Including_Flag': DCNRowArr = this.state.Meal_Prep_Including_Flag; break;
            case 'Laundry_Flag': DCNRowArr = this.state.Laundry_Flag; break;
            case 'Light_Housekeeping_Including_Flag': DCNRowArr = this.state.Light_Housekeeping_Including_Flag; break;
            default: DCNRowArr = []; break;
        }
        return DCNRowArr;
    }

    saveGlobalDCNWorkFlags = (key, new_arr) => {
        switch (key) {
            case 'Mobility_Walking_Moving_Flag': global.MobilityWalkingMovingFlag = new_arr; break;
            case 'Bathing_Showering_Flag': global.BathingShoweringFlag = new_arr; break;
            case 'Dressing_Flag': global.DressingFlag = new_arr; break;
            case 'Toileting_Flag': global.ToiletingFlag = new_arr; break;
            case 'Eating_Flag': global.EatingFlag = new_arr; break;
            case 'Continence_Bladder_Bowel_Flag': global.ContinenceBladderBowelFlag = new_arr; break;
            case 'Meal_Prep_Including_Flag': global.MealPrepIncludingFlag = new_arr; break;
            case 'Laundry_Flag': global.LaundryFlag = new_arr; break;
            case 'Light_Housekeeping_Including_Flag': global.LightHousekeepingIncludingFlag = new_arr; break;
        }
    }

    render() {
        const state = this.state;
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'column', borderColor: '#000', borderWidth: 0}}>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1, borderTopWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            { this.createTableHeader() }
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Mobility/Walking/Moving</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.MobilityWalkingMovingFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Mobility_Walking_Moving_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.MobilityWalkingMovingFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Mobility_Walking_Moving_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.MobilityWalkingMovingFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Mobility_Walking_Moving_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.MobilityWalkingMovingFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Mobility_Walking_Moving_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.MobilityWalkingMovingFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Mobility_Walking_Moving_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.MobilityWalkingMovingFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Mobility_Walking_Moving_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.MobilityWalkingMovingFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Mobility_Walking_Moving_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Bathing/Showering</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.BathingShoweringFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Bathing_Showering_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.BathingShoweringFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Bathing_Showering_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.BathingShoweringFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Bathing_Showering_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.BathingShoweringFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Bathing_Showering_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.BathingShoweringFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Bathing_Showering_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.BathingShoweringFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Bathing_Showering_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.BathingShoweringFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Bathing_Showering_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Dressing</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.DressingFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Dressing_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.DressingFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Dressing_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.DressingFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Dressing_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.DressingFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Dressing_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.DressingFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Dressing_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.DressingFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Dressing_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.DressingFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Dressing_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Toileting</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ToiletingFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Toileting_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ToiletingFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Toileting_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ToiletingFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Toileting_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ToiletingFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Toileting_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ToiletingFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Toileting_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ToiletingFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Toileting_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ToiletingFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Toileting_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Eating</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.EatingFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Eating_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.EatingFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Eating_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.EatingFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Eating_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.EatingFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Eating_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.EatingFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Eating_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.EatingFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Eating_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.EatingFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Eating_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Continence Bladder/Bowel</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ContinenceBladderBowelFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Continence_Bladder_Bowel_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ContinenceBladderBowelFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Continence_Bladder_Bowel_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ContinenceBladderBowelFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Continence_Bladder_Bowel_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ContinenceBladderBowelFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Continence_Bladder_Bowel_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ContinenceBladderBowelFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Continence_Bladder_Bowel_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ContinenceBladderBowelFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Continence_Bladder_Bowel_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.ContinenceBladderBowelFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Continence_Bladder_Bowel_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'column', marginTop: 25, borderColor: '#000', borderTopWidth: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Meal Preparation also including Kitchen Cleanup</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.MealPrepIncludingFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Meal_Prep_Including_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.MealPrepIncludingFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Meal_Prep_Including_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.MealPrepIncludingFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Meal_Prep_Including_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.MealPrepIncludingFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Meal_Prep_Including_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.MealPrepIncludingFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Meal_Prep_Including_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.MealPrepIncludingFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Meal_Prep_Including_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.MealPrepIncludingFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Meal_Prep_Including_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Laundry</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.LaundryFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Laundry_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.LaundryFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Laundry_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.LaundryFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Laundry_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.LaundryFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Laundry_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.LaundryFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Laundry_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.LaundryFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Laundry_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={styles.DCNCheckboxWrapperStyle}><CheckBox checked={global.LaundryFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Laundry_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 1}}>
                        <View style={{width:200, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#000'}}><Text style={styles.DCNLabelStyle}>Light Housekeeping also including Making Beds, Linen Change and Cleaning Client's Bathroom</Text></View>
                        <View style={{flex:7, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.LightHousekeepingIncludingFlag[0]} onPress={ () => this.set_DCN_Form_Row_Flag('Light_Housekeeping_Including_Flag', 0) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.LightHousekeepingIncludingFlag[1]} onPress={ () => this.set_DCN_Form_Row_Flag('Light_Housekeeping_Including_Flag', 1) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.LightHousekeepingIncludingFlag[2]} onPress={ () => this.set_DCN_Form_Row_Flag('Light_Housekeeping_Including_Flag', 2) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.LightHousekeepingIncludingFlag[3]} onPress={ () => this.set_DCN_Form_Row_Flag('Light_Housekeeping_Including_Flag', 3) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.LightHousekeepingIncludingFlag[4]} onPress={ () => this.set_DCN_Form_Row_Flag('Light_Housekeeping_Including_Flag', 4) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.LightHousekeepingIncludingFlag[5]} onPress={ () => this.set_DCN_Form_Row_Flag('Light_Housekeeping_Including_Flag', 5) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                            <View style={{flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000'}}><CheckBox checked={global.LightHousekeepingIncludingFlag[6]} onPress={ () => this.set_DCN_Form_Row_Flag('Light_Housekeeping_Including_Flag', 6) } containerStyle={styles.DCNCheckboxContainerStyle} checkedIcon={this.DCNCheckedIcon()} uncheckedIcon={this.DCNUncheckedIcon()} /></View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    DCNLabelStyle: {fontSize: 14, textAlign: 'left', color: '#000', paddingLeft: 5, marginTop: 'auto', marginBottom: 'auto'}, 
    DCNCheckboxWrapperStyle: {flex: 1, alignContent: 'center', borderRightWidth: 1, borderColor: '#000', height: 35, width: 70},
    DCNCheckboxContainerStyle: {marginTop: 'auto', marginBottom: 'auto', paddingTop: 5}
})

export default DCNWorkTable;