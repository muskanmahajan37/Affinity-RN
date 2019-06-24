/****************************************************************************
 * 
 * 
 * 
 * 
 * *************************************************************************/
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

const AFShare = {
    // ======================================================== //
    // =============== Control Panel ===============
    // ======================================================== //
    initDCNGlobalParamsFromLocal(DCNObj) {
        global.isNewDCN = DCNObj.isNewDCN;
        global.DcnHeaderId = DCNObj.DcnHeaderId;
        global.DcnDetailIds = DCNObj.DcnDetailIds;
        global.oldImageOfDCN = DCNObj.oldImageOfDCN;
        global.ImageOfDCN = DCNObj.ImageOfDCN;
        global.DCNImageFileName = DCNObj.DCNImageFileName;
        global.SocialSecurityNum = DCNObj.SocialSecurityNum; // for DCN Submitted Head,
        global.ClientId = DCNObj.ClientId;
        global.ClientName = DCNObj.ClientName;
        global.LastSaturdayDate = DCNObj.LastSaturdayDate;
        global.HourlyFlag = DCNObj.HourlyFlag;
        global.LiveInFlag = DCNObj.LiveInFlag;
        global.OvernightFlag = DCNObj.OvernightFlag;
        global.WeekTotalHours = DCNObj.WeekTotalHours;
        global.ComplianceFlag = DCNObj.ComplianceFlag;
        global.CaregiverSignature = DCNObj.CaregiverSignature;
        global.CaregiverSignatureDate = DCNObj.CaregiverSignatureDate;
        global.ClientSignature = DCNObj.ClientSignature;
        global.ClientSignatureDate = DCNObj.ClientSignatureDate;
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
    },

    // ======================================================== //
    // =============== Control Panel ===============
    // ======================================================== //
    async generateDCNWeek() {
        
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
    },

    initCreateDCNGlobalParams() {
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
    },

    initDCNGlobalParamsFromDB(DCNObj) {
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
    },

    calcWeekTotalHours() {
        var WeekTotalHours = 0;
        for (var i = 0; i < global.HoursPerDay_Arr.length; i++ ) {
            WeekTotalHours += global.HoursPerDay_Arr[i];
        }
        return WeekTotalHours;
    },

    // ======================================================== //
    // =============== Sign And Send ===============
    // ======================================================== //
    clearDCNObjOnLocal() {
        AsyncStorage.removeItem('DCNObj');
    },

    saveDCNObjToLocal() {
        var DCNObj = {
            isNewDCN : global.DcnHeaderId ? 'false' : 'true',
            DcnHeaderId : global.DcnHeaderId,
            DcnDetailIds : JSON.stringify(global.DcnDetailIds),
            oldImageOfDCN : global.oldImageOfDCN,
            ImageOfDCN : global.ImageOfDCN,
            DCNImageFileName : global.DCNImageFileName,
            SocialSecurityNum : global.SocialSecurityNum, // for DCN Submitted Head,
            ClientId : global.ClientId,
            ClientName : global.ClientName,
            LastSaturdayDate : global.LastSaturdayDate,
            HourlyFlag : global.HourlyFlag,
            LiveInFlag : global.LiveInFlag,
            OvernightFlag : global.OvernightFlag,
            WeekTotalHours : global.WeekTotalHours,
            ComplianceFlag : global.ComplianceFlag,
            CaregiverSignature : global.CaregiverSignature,
            CaregiverSignatureDate : moment(new Date(global.CaregiverSignatureDate)).format("YYYY-MM-DD"),
            ClientSignature : global.ClientSignature,
            ClientSignatureDate : moment(new Date(global.ClientSignatureDate)).format("YYYY-MM-DD"),
            HasPAF : global.HasPAF,
            // // PafId : global.PafId,
            SendToPhoneFlag : global.SendToPhoneFlag,
            Phone1 : global.Phone1,
            Phone2 : global.Phone2,
            SendToEmailFlag : global.SendToEmailFlag,
            Email1 : global.Email1,
            Email2 : global.Email2,
            DateTimeOfSubmission : global.DateTimeOfSubmission,
            GPSLocationOfSubmission : global.GPSLocationOfSubmission, // ---
            PDFOfDCN : global.PDFOfDCN, // ===
            // createdBy : global.createdBy,
            // created : global.created,
            // updatedBy : global.updatedBy,
            // updated : global.updated,
            selectedWeek : JSON.stringify(global.selectedWeek), // for DCN Submitted Detail
            DCNWeek : JSON.stringify(global.DCNWeek), // for DCNWeek Submitted Detail
            TimeInOutLength : global.TimeInOutLength,
            TimeIn1 : JSON.stringify(global.TimeIn_1_Arr),
            TimeIn2 : JSON.stringify(global.TimeIn_2_Arr),
            TimeIn3 : JSON.stringify(global.TimeIn_3_Arr),
            TimeIn4 : JSON.stringify(global.TimeIn_4_Arr),
            TimeOut1 : JSON.stringify(global.TimeOut_1_Arr),
            TimeOut2 : JSON.stringify(global.TimeOut_2_Arr),
            TimeOut3 : JSON.stringify(global.TimeOut_3_Arr),
            TimeOut4 : JSON.stringify(global.TimeOut_4_Arr),
            HoursPerDay : JSON.stringify(global.HoursPerDay_Arr),
            MobilityWalkingMovingFlag : JSON.stringify(global.MobilityWalkingMovingFlag),
            BathingShoweringFlag : JSON.stringify(global.BathingShoweringFlag),
            DressingFlag : JSON.stringify(global.DressingFlag),
            ToiletingFlag : JSON.stringify(global.ToiletingFlag),
            EatingFlag : JSON.stringify(global.EatingFlag),
            ContinenceBladderBowelFlag : JSON.stringify(global.ContinenceBladderBowelFlag),
            MealPrepIncludingFlag : JSON.stringify(global.MealPrepIncludingFlag),
            LaundryFlag : JSON.stringify(global.LaundryFlag),
            LightHousekeepingIncludingFlag : JSON.stringify(global.LightHousekeepingIncludingFlag),
            PersonalCareHours : global.PersonalCareHours, // -----
            HomemakingHours : global.HomemakingHours,
            CompanionHours : global.CompanionHours,
            RespiteHours : global.RespiteHours,
            AttendantHours : global.AttendantHours, // =====
            author : global.FirstName + ' ' + global.LastName, // --- created by or updated by
        }
        AsyncStorage.setItem({'DCNObj' : JSON.stringify(DCNObj)});
    },

    generateSendData() {
        var DCNImageFileName = global.FirstName + global.LastName + '_' + (new Date().getTime());
        global.DCNImageFileName = DCNImageFileName;
        const data = new FormData();
        data.append('ImageOfDCN', {
            uri: global.ImageOfDCN,
            type: 'image/png',
            name: DCNImageFileName
        });
        data.append('isNewDCN', global.isNewDCN);
        data.append('DcnHeaderId', global.DcnHeaderId);
        data.append('DcnDetailIds', JSON.stringify(global.DcnDetailIds));
        data.append('oldImageOfDCN', global.oldImageOfDCN);
        data.append('DCNImageFileName', global.DCNImageFileName);
        data.append('SocialSecurityNum', global.SocialSecurityNum); // for DCN Submitted Header
        data.append('ClientId', global.ClientId);
        data.append('ClientName', global.ClientName);
        data.append('LastSaturdayDate', global.LastSaturdayDate);
        data.append('HourlyFlag', global.HourlyFlag);
        data.append('LiveInFlag', global.LiveInFlag);
        data.append('OvernightFlag', global.OvernightFlag);
        data.append('WeekTotalHours', global.WeekTotalHours);
        data.append('ComplianceFlag', global.ComplianceFlag);
        data.append('CaregiverSignature', global.CaregiverSignature);
        data.append('CaregiverSignatureDate', moment(new Date(global.CaregiverSignatureDate)).format("YYYY-MM-DD"));
        data.append('ClientSignature', global.ClientSignature);
        data.append('ClientSignatureDate', moment(new Date(global.ClientSignatureDate)).format("YYYY-MM-DD"));
        data.append('HasPAF', global.HasPAF);
        // // data.append('PafId', global.PafId);
        data.append('SendToPhoneFlag', global.SendToPhoneFlag);
        data.append('Phone1', global.Phone1 ? global.Phone1 : '');
        data.append('Phone2', global.Phone2 ? global.Phone2 : '');
        data.append('SendToEmailFlag', global.SendToEmailFlag);
        data.append('Email1', global.Email1 ? global.Email1 : '');
        data.append('Email2', global.Email2 ? global.Email2 : '');
        data.append('DateTimeOfSubmission', global.DateTimeOfSubmission);
        data.append('GPSLocationOfSubmission', global.GPSLocationOfSubmission); // ---
        // data.append('ImageOfDCN', global.ImageOfDCN);
        data.append('PDFOfDCN', global.PDFOfDCN); // ===
        // data.append('createdBy', global.createdBy);
        // data.append('created', global.created);
        // data.append('updatedBy', global.updatedBy);
        // data.append('updated', global.updated);
        data.append('selectedWeek', JSON.stringify(global.selectedWeek)); // for DCN Submitted Detail
        data.append('DCNWeek', JSON.stringify(global.DCNWeek)); // for DCNWeek Submitted Detail
        data.append('TimeInOutLength', global.TimeInOutLength);
        data.append('TimeIn1', JSON.stringify(global.TimeIn_1_Arr));
        data.append('TimeIn2', JSON.stringify(global.TimeIn_2_Arr));
        data.append('TimeIn3', JSON.stringify(global.TimeIn_3_Arr));
        data.append('TimeIn4', JSON.stringify(global.TimeIn_4_Arr));
        data.append('TimeOut1', JSON.stringify(global.TimeOut_1_Arr));
        data.append('TimeOut2', JSON.stringify(global.TimeOut_2_Arr));
        data.append('TimeOut3', JSON.stringify(global.TimeOut_3_Arr));
        data.append('TimeOut4', JSON.stringify(global.TimeOut_4_Arr));
        data.append('HoursPerDay', JSON.stringify(global.HoursPerDay_Arr));
        data.append('MobilityWalkingMovingFlag', JSON.stringify(global.MobilityWalkingMovingFlag));
        data.append('BathingShoweringFlag', JSON.stringify(global.BathingShoweringFlag));
        data.append('DressingFlag', JSON.stringify(global.DressingFlag));
        data.append('ToiletingFlag', JSON.stringify(global.ToiletingFlag));
        data.append('EatingFlag', JSON.stringify(global.EatingFlag));
        data.append('ContinenceBladderBowelFlag', JSON.stringify(global.ContinenceBladderBowelFlag));
        data.append('MealPrepIncludingFlag', JSON.stringify(global.MealPrepIncludingFlag));
        data.append('LaundryFlag', JSON.stringify(global.LaundryFlag));
        data.append('LightHousekeepingIncludingFlag', JSON.stringify(global.LightHousekeepingIncludingFlag));
        data.append('PersonalCareHours', global.PersonalCareHours); // -----
        data.append('HomemakingHours', global.HomemakingHours);
        data.append('CompanionHours', global.CompanionHours);
        data.append('RespiteHours', global.RespiteHours);
        data.append('AttendantHours', global.AttendantHours); // =====
        data.append('author', global.FirstName + ' ' + global.LastName); // --- created by or updated by

        return data;
    },


}

export default AFShare;