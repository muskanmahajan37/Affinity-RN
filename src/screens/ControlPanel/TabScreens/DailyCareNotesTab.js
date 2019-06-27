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
import API from '../../../helpers/API';
import AFShare from '../../../helpers/AFShare';

class DailyCareNotesTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spinner: false, 
            filter: 'Active', 
            // filters: [{label: 'All', value: 'all'}, {label: 'Active', value: 'active'}, {label: 'Sent', value: 'sent'}, {label: 'Cancelled', value: 'cancelled'}],
            filters: ['All', 'Active', 'Sent', 'Cancelled'],
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
        // this.setState({spinner: true});
        var params = {
            SocialSecurityNum: global.SocialSecurityNum.toString(),
            ClientId: global.ClientId.toString(),
            LastSaturdayDate: global.LastSaturdayDate.toString()
        }
        API.get_dcnlist(params)
        .then((res) => {
            // this.setState({spinner: false});
            if(res.status == 0) {
                DCNList = JSON.parse(res.data || '{}');
                this.setState({DCNList: DCNList});
                this.initDCNList(DCNList);
            } else {
                console.log('Error', res.msg);
                this.setState({DCNList: []});
                this.initDCNList([]);
            }
        })
        .catch((err) => {
            // this.setState({spinner: false});
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

    // selectFilter = (value, index) => {
    selectFilter = (value) => {
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
                        {/* <Picker
                            mode="dropdown"
                            selectedValue={this.state.filter}
                            style={[styles.filterPicker, {padding: 5}]}
                            onValueChange={(itemValue, itemIndex) => this.selectFilter(itemValue, itemIndex)}>
                            { filterPickerItems }
                        </Picker> */}
                        <ModalDropdown
                            options={this.state.filters}
                            defaultValue={this.state.filter}
                            style={[styles.filterPicker, {padding: 5}]}
                            textStyle={{fontSize: 17, color: '#000', textAlign: 'left'}}
                            dropdownStyle={{width: 150, shadowColor: '#000', shadowOffset: { width: 0, height: 1,}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3}}
                            dropdownTextStyle={{fontSize: 17, color: '#000'}} 
                            onSelect={(value) => this.selectFilter(this.state.filters[value])}
                        >
                        </ModalDropdown>
                        <View style={{top: 7}}>
                            <Image style={{width: 20, height: 20, marginLeft: -35}} source={require('../../../assets/img/icon-arrow-down.png')} />
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                    <Text style={{flex: 1, color: '#000', fontSize: 15, margin: 7, flexDirection: 'row', textAlign: 'left', paddingLeft: 5}}>Select a Week of Service</Text>
                    <View style={{width: 140, height: 35, backgroundColor: '#ddd', color: '#000', flexDirection: 'row', marginRight: 10, marginLeft: 10}}>
                        <ModalDropdown
                            options={this.state.options}
                            defaultValue={this.state.defaultValue}
                            style={{height: 35, color: '#000', flex: 1, padding: 5}}
                            textStyle={{fontSize: 17, color: '#000', textAlign: 'center'}}
                            dropdownStyle={{width: 140, shadowColor: '#000', shadowOffset: { width: 0, height: 1,}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3}}
                            dropdownTextStyle={{fontSize: 17, color: '#000'}} 
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
        if (DcnHeaderId == global.DcnHeaderId && global.isRemember) {
            global.WeekTotalHours = AFShare.calcWeekTotalHours();
            this.props.navigation.navigate('DailyCareNotes');
            return;
        }

        this.setState({spinner: true});
        var params = {
            DcnHeaderId: DcnHeaderId.toString()
        }
        API.get_dcndetail(params)
        .then((resJson) => {
            result = JSON.parse(resJson);
            if (result.status == 0) {
                this.setState({spinner: false});
                DCNObj = result.data;
                AFShare.initDCNGlobalParamsFromDB(DCNObj);
                // this.initSelectedWeekTerms(DCNObj.LastSaturdayDate);
                // AFShare.generateDCNWeek();
                this.props.navigation.navigate('DailyCareNotes');
            } else {
                this.afAlert('Error', resJson.msg);
            }
        })
        .catch((err) => {
            this.setState({spinner: false});
            console.log('=== fetch DCN items - error ===', err);
        });
    }

    afAlert = (title, msg) => {
        Alert.alert(
            title,
            msg,
            [{ text: 'OK', onPress: () => this.setState({spinner: false}) }],
            {cancelable: false},
        );
    }

    initSelectedWeekTerms = (LastSaturdayDate) => {
        console.log('=====>>>>', LastSaturdayDate, global.LastSaturdayDate);
    }

    // ========================= Create DCN ======================== //

    createDCN() {
        if (this.state.DCNFlatList.length > 0) {
            this.openDCN(this.state.DCNFlatList[0].key);
        } else {
            AFShare.generateDCNWeek();
            AFShare.initCreateDCNGlobalParams();
            this.props.navigation.navigate('DailyCareNotes');
        }
    }
    
}



const styles = StyleSheet.create({
    filterText: {
        color: '#000', fontSize: 15, flex: 6, flexDirection: 'row', textAlign: 'right', paddingTop: 5
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
        textAlign: 'center', alignContent: 'center', justifyContent: 'center', color: '#fff', marginTop: 'auto', marginBottom: 'auto'
    }
})

// export default DailyCareNotesTab;
export default withNavigation(DailyCareNotesTab);