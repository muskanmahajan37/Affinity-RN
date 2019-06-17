/**************************************************************
 ***********  API to connect server **********
 **************************************************************/
import CONSTS, { USER_KEY, USER_DATA } from './Consts';

const API = {
    
    // =================== Login API =================== //
    // ----------- Get PassCode ----------- //
    get_passcode(user) {
        return fetch(CONSTS.BASE_API + 'login/get_passcode', {
            method: 'POST', 
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json());
    },

    // -------------- Login --------------- //
    login(user) {
        return fetch(CONSTS.BASE_API + 'login', {
            method: 'POST', 
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json());
    },

    // ================ Control Panel API ================ //
    // ----------- get clients ------------ //
    get_clients() {
        return fetch(CONSTS.BASE_API + 'cpanel/client')
        .then((res) => res.json());
    },

    // ---------- get DCN List ----------- //
    get_dcnlist(params) {
        return fetch(CONSTS.BASE_API + 'get_dcnlist', {
            method: 'POST', 
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json());
    },

    // ---------- get DCN Detail ---------- //
    get_dcndetail(params) {
        return fetch(CONSTS.BASE_API + 'get_dcndetail', {
            method: 'POST', 
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.text())
    },

    // ==================== SignAndScreen ======================= //
    // ---------- send DCN data ---------- //
    send_data(data) {
        return fetch(CONSTS.BASE_API + 'send_data', {
            method: 'POST', 
            headers:{
                "Content-Type": "multipart/form-data; charset=utf-8",
            },
            body: data
        })
        .then((res) => res.json())
    },
    

}

export default API;