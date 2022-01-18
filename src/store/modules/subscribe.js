import {
    getSelectablePortsList,
    submit_subscribeForm,
    get_subscribeList
} from "@/api/port";

const state = {
    portName: '',
    transboundaryType: '',
    startAdd: '',
    endAdd: '',
    ownerName: '',
    phoneNumber: '',
    licensePlate: '',
    caseNumber: '',
    goodsType: '',
    goodsWeight: '',
    startTime: '',
    endTime: ''
}

const actions = {
    getPortsList(_, data) {
        return new Promise((resolve, reject) => {
            console.log(data)
            getSelectablePortsList(data)
                .then(response => {
                    console.log(response.data)
                    if (response.code === 1) { // code === xxxx 成功获取口岸列表
                        resolve(response.data) // 返回列表数据
                    }
                })
                .catch(error => reject(error))
        })
    },
    submitSubscribeForm({
        state
    }) {
        return new Promise((resolve, reject) => {
            submit_subscribeForm(state.subscribe.getters.subscribeForm)
                .then(response => {
                    if (response.code === 1111) { // code === xxxx 预约成功
                        resolve(response.data)
                    }
                })
                .catch(error => reject(error))
        })
    },
    getSubscribeList({
        state
    }){
        return new Promise((resolve, reject) => {
            get_subscribeList(state.user.userInfo.id)
            .then(response => {
                if(response.code === 1111) { // code === xxxx 获取成功
                    resolve(response.data)
                }
            })
            .catch(error => reject(error))
        })
    }
}

const mutations = {
    SET_transboundaryType: (state, data) => {
        state.transboundaryType = data
    },
    SET_startAdd: (state, data) => {
        state.startAdd = data
    },
    SET_endAdd: (state, data) => {
        state.endAdd = data
    },
    SET_ownerName: (state, data) => {
        state.ownerName = data
    },
    SET_phoneNumber: (state, data) => {
        state.phoneNumber = data
    },
    SET_licensePlate: (state, data) => {
        state.licensePlate = data
    },
    SET_caseNumber: (state, data) => {
        state.caseNumber = data
    },
    SET_goodsType: (state, data) => {
        state.goodsType = data
    },
    SET_goodsWeight: (state, data) => {
        state.goodsWeight = data
    },
    SET_startTime: (state, data) => {
        state.startTime = data
    },
    SET_endTime: (state, data) => {
        state.endTime = data
    },
    SET_portName: (state, data) => {
        state.portName = data
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}