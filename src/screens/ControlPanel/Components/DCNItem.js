import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CONSTS, { USER_KEY, USER_DATA } from '../../../helpers/Consts';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { withNavigation } from 'react-navigation';

class DCNItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spinner: false, 
        }; 
    }

    render() {
        return (
            <View style={styles.DCNItemWrapper}>
                <Spinner 
                    visible={this.state.spinner} 
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
                />
                <Text style={styles.DCNItemText}>{this.props.title}</Text>
                <TouchableOpacity
                    style={styles.DCNItemButton}
                    onPress={() => this.openDCN(this.props.DcnId)}
                >
                    <Text style={styles.DCNItemButtonText}>{this.props.btnTitle}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    openDCN(DcnHeaderId) {
        this.setState({spinner: true});
        fetch(CONSTS.BASE_API + 'get_dcndetail', {
            method: 'POST', 
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                DcnHeaderId: DcnHeaderId.toString()
            })
        })
        .then((res) => res.json())
        .then((resJson) => {
            console.log('==>>> DcnDetail >>> resJson ===>>>', resJson);
            this.setState({spinner: false});
            if (resJson.status == 0) {
                DCNObj = JSON.parse(resJson.data || '{}');
                this.initDCNGlobalParamsFromDB(DCNObj);
                this.initSelectedWeekTerms(DCNObj.LastSaturdayDate);
                this.generateDCNWeek();
                console.log('>>>>>', DCNObj);
                this.props.navigation.navigate('DailyCareNotes');
            } else {
                Alert.alert('Error', resJson.msg);
            }
        })
        .catch((err) => {
            this.setState({spinner: false});
            console.log('=== fetch DCN items - error ===', err);
        });
    }

    initDCNGlobalParamsFromDB = (DCNObj) => {
        global.ImageOfDCN = DCNObj.ImageOfDCN;
        global.DCNImageFileName = DCNObj.DCNImageFileName;
        global.SocialSecurityNum = DCNObj.SocialSecurityNum; // for DCN Submitted Head,
        global.ClientId = DCNObj.ClientId;
        global.LastSaturdayDate = DCNObj.LastSaturdayDate;
        global.HourlyFlag = DCNObj.HourlyFlag;
        global.LiveInFlag = DCNObj.LiveInFlag;
        global.OvernightFlag = DCNObj.OvernightFlag;
        global.WeekTotalHours = DCNObj.WeekTotalHours;
        global.ComplianceFlag = DCNObj.ComplianceFlag;
        global.CaregiverSignature = DCNObj.CaregiverSignature;
        global.CaregiverSignatureDate = moment(new Date(DCNObj.CaregiverSignatureDate)).format("M/DD/YYYY");
        global.ClientSignature = DCNObj.ClientSignature;
        global.ClientSignatureDate = moment(new Date(DCNObj.ClientSignatureDate)).format("M/DD/YYYY");
        global.HasPAF = DCNObj.HasPAF;
        // // global.PafId = DCNObj.PafId;
        global.SendToPhoneFlag = DCNObj.SendToPhoneFlag;
        global.Phone1 = DCNObj.Phone1;
        global.Phone2 = DCNObj.Phone2;
        global.SendToEmailFlag = DCNObj.SendToEmailFlag;
        global.Email1 = DCNObj.Email1;
        global.Email2 = DCNObj.Email2;
        global.DateTimeOfSubmission = DCNObj.DateTimeOfSubmission;
        global.GPSLocationOfSubmission = DCNObj.GPSLocationOfSubmission; // ---
        global.PDFOfDCN = DCNObj.PDFOfDCN; // ===
        // global.createdBy = DCNObj.createdBy;
        // global.created = DCNObj.created;
        // global.updatedBy = DCNObj.updatedBy;
        // global.updated = DCNObj.updated;
        global.selectedWeek = JSON.parse(DCNObj.selectedWeek); // for DCN Submitted Detail
        global.DCNWeek = JSON.parse(DCNObj.DCNWeek); // for DCNWeek Submitted Detail
        global.TimeInOutLength = DCNObj.TimeInOutLength;
        global.TimeIn_1_Arr = JSON.parse(DCNObj.TimeIn1);
        global.TimeIn_2_Arr = JSON.parse(DCNObj.TimeIn2);
        global.TimeIn_3_Arr = JSON.parse(DCNObj.TimeIn3);
        global.TimeIn_4_Arr = JSON.parse(DCNObj.TimeIn4);
        global.TimeOut_1_Arr = JSON.parse(DCNObj.TimeOut1);
        global.TimeOut_2_Arr = JSON.parse(DCNObj.TimeOut2);
        global.TimeOut_3_Arr = JSON.parse(DCNObj.TimeOut3);
        global.TimeOut_4_Arr = JSON.parse(DCNObj.TimeOut4);
        global.HoursPerDay_Arr = JSON.parse(DCNObj.HoursPerDay);
        global.MobilityWalkingMovingFlag = JSON.parse(DCNObj.MobilityWalkingMovingFlag);
        global.BathingShoweringFlag = JSON.parse(DCNObj.BathingShoweringFlag);
        global.DressingFlag = JSON.parse(DCNObj.DressingFlag);
        global.ToiletingFlag = JSON.parse(DCNObj.ToiletingFlag);
        global.EatingFlag = JSON.parse(DCNObj.EatingFlag);
        global.ContinenceBladderBowelFlag = JSON.parse(DCNObj.ContinenceBladderBowelFlag);
        global.MealPrepIncludingFlag = JSON.parse(DCNObj.MealPrepIncludingFlag);
        global.LaundryFlag = JSON.parse(DCNObj.LaundryFlag);
        global.LightHousekeepingIncludingFlag = JSON.parse(DCNObj.LightHousekeepingIncludingFlag);
        global.PersonalCareHours = DCNObj.PersonalCareHours; // -----
        global.HomemakingHours = DCNObj.HomemakingHours;
        global.CompanionHours = DCNObj.CompanionHours;
        global.RespiteHours = DCNObj.RespiteHours;
        global.AttendantHours = DCNObj.AttendantHours; // =====
        global.FirstName = DCNObj.author.split(' ')[0];
        global.LastName = DCNObj.author.split(' ')[1];
    }

    initSelectedWeekTerms = (LastSaturdayDate) => {
        console.log('=====>>>>', LastSaturdayDate, global.LastSaturdayDate);
    }

    generateDCNWeek = async () => {
        
        var selectedMonth = global.selectedMonth;
        var selectedWeek = global.selectedWeek;
        var selectedWeekIndex = global.selectedWeekIndex;
        var minIndex = 0;
        var maxIndex = parseInt(selectedWeek.length) - 1;
        var DCNWeek = [];

        if(parseInt(selectedWeek[minIndex]) > parseInt(selectedWeek[maxIndex])) {
            if(selectedWeekIndex) { // in the case of last week
                for(var i = 0; i <= maxIndex; i++) {
                    if(parseInt(selectedWeek[i]) < parseInt(selectedWeek[minIndex])) { // days of next month
                        var calc_month = ((parseInt(selectedMonth.split('-')[1]) + 1) > 12) ? 1 : (parseInt(selectedMonth.split('-')[1]) + 1);
                        calc_month = calc_month.toString().length > 1 ? calc_month.toString() : '0' + calc_month.toString();
                        // on last month - calculate next year
                        var calc_year = parseInt(calc_month) == 1 ? (parseInt(selectedMonth.split('-')[0]) + 1) : parseInt(selectedMonth.split('-')[0]);
                        DCNWeek.push(calc_year + '-' + calc_month + '-' + selectedWeek[i]);
                    } else { // days of current month
                        DCNWeek.push( selectedMonth + '-' + selectedWeek[i]);
                    }
                }
            } else { // in the case of first week
                for(var i = 0; i <= maxIndex; i++) {
                    if(parseInt(selectedWeek[i]) < parseInt(selectedWeek[minIndex])) { // days of current month
                        DCNWeek.push(selectedMonth + '-' + selectedWeek[i]);
                    } else { // days of previous month
                        var calc_month = ((parseInt(selectedMonth.split('-')[1]) - 1) < 1) ? 12 : (parseInt(selectedMonth.split('-')[1]) - 1);
                        calc_month = calc_month.toString().length > 1 ? calc_month.toString() : '0' + calc_month.toString();
                        // on first month - calculate last year
                        var calc_year = parseInt(calc_month) == 12 ? (parseInt(selectedMonth.split('-')[0]) - 1) : parseInt(selectedMonth.split('-')[0]);
                        DCNWeek.push(calc_year + '-' + calc_month + '-' + selectedWeek[i]);
                    }
                }
            }
        } else {
            for(var i = 0; i <= maxIndex; i++) {
                DCNWeek.push(selectedMonth + '-' + selectedWeek[i]);
            }
        }
        global.DCNWeek = DCNWeek;
        global.LastSaturdayDate = DCNWeek[DCNWeek.length - 1]; // DB - LastSaturdayDate
        return true;
    }
    
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

// export default DCNItem;
export default withNavigation(DCNItem);