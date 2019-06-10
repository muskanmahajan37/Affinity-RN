import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, Alert, Picker } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown-updated';
import DCNItem from '../Components/DCNItem';
import DCNWeekPickerModal from '../Components/DCNWeekPickerModal/DCNWeekPickerModal';
import { getCurrentMonthString, convert2mYStr2YYYYMM, getFullMonWeeksArr, getCurrentWeekIndex } from '../../../helpers/AFDate';
import CONSTS, { USER_KEY, USER_DATA } from '../../../helpers/Consts';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { withNavigation } from 'react-navigation';

class DailyCareNotesTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spinner: false, 
            filter: 'Active', 
            filters: [{label: 'All', value: 'all'}, {label: 'Active', value: 'active'}, {label: 'Sent', value: 'sent'}, {label: 'Cancelled', value: 'cancelled'}],
            options: this.generateOptions(),
            defaultValue: (getCurrentMonthString() + ' ' + new Date().getFullYear()), 
            selectedMonth: this.getCurrentYYYYDD(),
            selectedWeek: [],
            selectedWeekIndex: getCurrentWeekIndex() ? getCurrentWeekIndex() : 0,
            month: '',
            week: '',
            DCNList: [], // {DcnHeaderId, ClientName, LastSaturdayDate}
            DCNFlatList: [], // {title, key}
            dataSource: [{title: 'first', key: 'item1'}, {title: 'second', key: 'item2'}, {title: 'third', key: 'item3'}],
        }; 
        global.selectedMonth = this.getCurrentYYYYDD();
        global.selectedWeekIndex = getCurrentWeekIndex() ? getCurrentWeekIndex() : 0
        global.selectedWeek = getFullMonWeeksArr(global.selectedMonth)[global.selectedWeekIndex];
        // this.selectedMonth(this.state.selectedMonth);
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentDidMount() {
        this.props.onRef(this)
        if(global.selectedWeekIndex && parseInt(global.selectedWeek[0]) > parseInt(global.selectedWeek[6])) {
            var calcY = parseInt(global.selectedMonth.split('-')[0]);
            var calcM = parseInt(global.selectedMonth.split('-')[1]);
            calcY = calcM == 12 ? calcY + 1 : calcY;
            calcM = calcM == 12 ? 1 : calcM;
            global.LastSaturdayDate = calcY + '-' + calcM + '-' + global.selectedWeek[6];
        } else {
            global.LastSaturdayDate = global.selectedMonth + '-' + global.selectedWeek[6];
        }
        this.fetchDCNItems();
    }

    fetchDCNItems = () => {
        this.setState({spinner: true});
        fetch(CONSTS.BASE_API + 'get_dcnlist', {
            method: 'POST', 
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                SocialSecurityNum: global.SocialSecurityNum.toString(),
                ClientId: global.ClientId.toString(),
                LastSaturdayDate: global.LastSaturdayDate.toString()
            })
        })
        .then((res) => res.json())
        .then((resJson) => {
            this.setState({spinner: false});
            if(resJson.status == 0) {
                DCNList = JSON.parse(resJson.data || '{}');
                this.setState({DCNList: DCNList});
                this.initDCNList(DCNList);
            } else {
                console.log('Error', resJson.msg);
                this.setState({DCNList: []});
                this.initDCNList([]);
            }
        })
        .catch((err) => {
            this.setState({spinner: false});
            console.log('=== fetch DCN items - error ===', err);
        });
    }

    initDCNList(DCNList) {
        var DCNFlatList = [];
        for (var i = 0; i < DCNList.length; i++) {
            var title = DCNList[i].ClientName.split(' ').join('_') + '_' + DCNList[i].LastSaturdayDate.split('-').join('_');
            var key = DCNList[i].DcnHeaderId.toString();
            DCNFlatList.push({
                title: title,
                key: key
            });
        }
        global.DCNFlatList = DCNFlatList;
        this.setState({DCNFlatList: DCNFlatList});
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
        global.LastSaturdayDate = global.selectedMonth + '-' + global.selectedWeek[6];
        this.fetchDCNItems();
    }

    selectFilter = (value, index) => {
        this.setState({filter: value});
    }

    render() {
        // render Filter Items
        var filters = this.state.filters;
        var filterPickerItems = [];
        for (var i=0; i<filters.length; i++) {
            filterPickerItems.push(
                <Picker.Item key={i} label={filters[i].label} value={filters[i].value} />
            );
        }

        return (
            <View style={{flex: 11, zIndex: 1}}>
                <Spinner 
                    visible={this.state.spinner} 
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={{flexDirection: 'row', marginBottom: 25}}>
                    <Text style={styles.filterText}>Fitler</Text>
                    <View style={styles.filterPickerWrapper}>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.filter}
                            style={[styles.filterPicker, {padding: 5}]}
                            onValueChange={(itemValue, itemIndex) => this.selectFilter(itemValue, itemIndex)}>
                            { filterPickerItems }
                        </Picker>
                        <View style={{top: 7}}>
                            <Image style={{width: 20, height: 20, marginLeft: -35}} source={require('../../../assets/img/icon-arrow-down.png')} />
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
                <View style={{flex: 1, flexDirection: 'row', zIndex: 2, marginBottom: 10}}>
                    <View style={styles.weekPickerWrapper}>
                        <DCNWeekPickerModal selectedWeekIndex={this.state.selectedWeekIndex} selectedMonth={global.selectedMonth} detectWeekChangeEvent={() => { this.fetchDCNItems() }}></DCNWeekPickerModal>
                    </View>
                </View>
                <View style={{flex: 7, flexDirection: 'row', marginBottom: 20, minHeight: 150}}>
                    <View style={{width: '100%'}}>
                        <View style={{width: '100%'}}>
                            <FlatList 
                                data={this.state.DCNFlatList}
                                renderItem={({item}) => <DCNItem title={item.title} DcnId={item.key} btnTitle={"Open"} openDCN={this.openDCN}></DCNItem>}
                            />
                        </View>
                        <View style={{width: '100%', alignItems: 'flex-end', paddingRight: 10, paddingTop: 5}}>
                            <View style={{width: '25%', padding: 2}}>
                                <TouchableOpacity
                                    style={styles.DCNCreateButton}
                                    onPress={() => this.createDCN()}
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

    // ============================ Open & Edit DCN =========================== //

    openDCN = (DcnHeaderId) => {
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
        .then((res) => res.text())
        .then((resJson) => {
            result = JSON.parse(resJson);
            this.setState({spinner: false});
            if (result.status == 0) {
                DCNObj = result.data;
                this.initDCNGlobalParamsFromDB(DCNObj);
                // this.initSelectedWeekTerms(DCNObj.LastSaturdayDate);
                // this.generateDCNWeek();
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
        global.isNewDCN = 'false';
        global.DcnHeaderId = DCNObj.DcnHeaderId;
        global.DcnDetailIds = DCNObj.DcnDetailIds;
        global.ImageOfDCN = DCNObj.ImageOfDCN;
        global.oldImageOfDCN = DCNObj.ImageOfDCN;
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
        global.selectedWeek = DCNObj.selectedWeek; // for DCN Submitted Detail
        global.DCNWeek = DCNObj.DCNWeek; // for DCNWeek Submitted Detail
        global.TimeInOutLength = parseInt(DCNObj.TimeInOutLength);
        global.TimeIn_1_Arr = DCNObj.TimeIn1;
        global.TimeIn_2_Arr = DCNObj.TimeIn2;
        global.TimeIn_3_Arr = DCNObj.TimeIn3;
        global.TimeIn_4_Arr = DCNObj.TimeIn4;
        global.TimeOut_1_Arr = DCNObj.TimeOut1;
        global.TimeOut_2_Arr = DCNObj.TimeOut2;
        global.TimeOut_3_Arr = DCNObj.TimeOut3;
        global.TimeOut_4_Arr = DCNObj.TimeOut4;
        global.HoursPerDay_Arr = DCNObj.HoursPerDay;
        global.MobilityWalkingMovingFlag = DCNObj.MobilityWalkingMovingFlag;
        global.BathingShoweringFlag = DCNObj.BathingShoweringFlag;
        global.DressingFlag = DCNObj.DressingFlag;
        global.ToiletingFlag = DCNObj.ToiletingFlag;
        global.EatingFlag = DCNObj.EatingFlag;
        global.ContinenceBladderBowelFlag = DCNObj.ContinenceBladderBowelFlag;
        global.MealPrepIncludingFlag = DCNObj.MealPrepIncludingFlag;
        global.LaundryFlag = DCNObj.LaundryFlag;
        global.LightHousekeepingIncludingFlag = DCNObj.LightHousekeepingIncludingFlag;
        global.PersonalCareHours = DCNObj.PersonalCareHours; // -----
        global.HomemakingHours = DCNObj.HomemakingHours;
        global.CompanionHours = DCNObj.CompanionHours;
        global.RespiteHours = DCNObj.RespiteHours;
        global.AttendantHours = DCNObj.AttendantHours; // =====
        global.FirstName = DCNObj.updatedBy.split(' ')[0];
        global.LastName = DCNObj.updatedBy.split(' ')[1];
    }

    initSelectedWeekTerms = (LastSaturdayDate) => {
        console.log('=====>>>>', LastSaturdayDate, global.LastSaturdayDate);
    }

    // ========================= Create DCN ======================== //

    createDCN() {
        if (this.state.DCNFlatList.length > 0) {
            this.openDCN(this.state.DCNFlatList[0].key);
        } else {
            this.generateDCNWeek();
            this.initCreateDCNGlobalParams();
            this.props.navigation.navigate('DailyCareNotes');
        }
    }

    goCreateDCN=() => {
        this.generateDCNWeek();
        this.initCreateDCNGlobalParams();
        this.props.navigation.navigate('DailyCareNotes');
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

    initCreateDCNGlobalParams(){
        // DCNForm
        global.isNewDCN = 'true';
        global.DcnHeaderId = '';
        global.DcnDetailIds = [];
        global.HourlyFlag = true; // DB - HourlyFlag
        global.LiveInFlag = false; // DB - LiveInFlag
        global.OvernightFlag = false; // DB - OvernightFlag
        global.TimeInOutLength = 0;
        global.TimeIn_1_Arr = ['', '', '', '', '', '', ''];
        global.TimeIn_2_Arr = ['', '', '', '', '', '', ''];
        global.TimeIn_3_Arr = ['', '', '', '', '', '', ''];
        global.TimeIn_4_Arr = ['', '', '', '', '', '', ''];
        global.TimeOut_1_Arr = ['', '', '', '', '', '', ''];
        global.TimeOut_2_Arr = ['', '', '', '', '', '', ''];
        global.TimeOut_3_Arr = ['', '', '', '', '', '', ''];
        global.TimeOut_4_Arr = ['', '', '', '', '', '', ''];
        global.HoursPerDay_Arr = [0, 0, 0, 0, 0, 0, 0];
        global.WeekTotalHours = 0;
        global.MobilityWalkingMovingFlag = [false, false, false, false, false, false, false];
        global.BathingShoweringFlag = [false, false, false, false, false, false, false];
        global.DressingFlag = [false, false, false, false, false, false, false];
        global.ToiletingFlag = [false, false, false, false, false, false, false];
        global.EatingFlag = [false, false, false, false, false, false, false];
        global.ContinenceBladderBowelFlag = [false, false, false, false, false, false, false];
        global.MealPrepIncludingFlag = [false, false, false, false, false, false, false];
        global.LaundryFlag = [false, false, false, false, false, false, false];
        global.LightHousekeepingIncludingFlag = [false, false, false, false, false, false, false];
        // SignAndSend
        global.ComplianceFlag = true;
        global.CaregiverSignature = '';
        global.CaregiverSignatureDate = '';
        global.ClientSignature = '';
        global.ClientSignatureDate = '';
        global.SendToPhoneFlag = true;
        global.Phone1 = '';
        global.Phone2 = '';
        global.SendToEmailFlag = true;
        global.Email1 = '';
        global.Email2 = '';
    }
    
}



const styles = StyleSheet.create({
    filterText: {
        color: '#000', fontSize: 18, flex: 6, flexDirection: 'row', textAlign: 'right', paddingTop: 5
    },
    filterPickerWrapper: {
        height: 35, backgroundColor: '#ddd', color: '#000', flex: 6, flexDirection: 'row', marginRight: 10, marginLeft: 10
    },
    filterPicker: {
        height: 35, color: '#000', flex: 6
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

// export default DailyCareNotesTab;
export default withNavigation(DailyCareNotesTab);