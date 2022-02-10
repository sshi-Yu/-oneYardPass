import {
    getSelectablePortsList,
    submit_subscribeForm,
    get_subscribeList,
    getPortAddressList
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
    endTime: '',
    portId: ''
}

const actions = {
    getPortsList(_, data) {
        return new Promise((resolve, reject) => {
            // console.log(data)
            getSelectablePortsList(data)
                .then(response => {
                    // console.log(response.data)
                    if (response.code === 1) { // code === xxxx 成功获取口岸列表
                        resolve(response.data) // 返回列表数据
                    }
                })
                .catch(error => reject(error))
        })
    },
    submitSubscribeForm({
        rootGetters
    }) {
        return new Promise((resolve, reject) => {
            const {
                subscribeForm,
            } = rootGetters
            const {
                _id
            } = rootGetters.userInfo
            const subInfo = {
                port_id: subscribeForm.portId,
                case_number: subscribeForm.caseNumber,
                proposer_id: _id,
                driver_name: subscribeForm.ownerName,
                phone: subscribeForm.phoneNumber,
                begin_time: new Date(subscribeForm.startTime), // 转为标准时间
                end_time: new Date(subscribeForm.endTime), // 转为标准时间
                goods_weight: subscribeForm.goodsWeight,
                goods_type: subscribeForm.goodsType,
                transboundary_type: subscribeForm.transboundaryType,
                license_plate: subscribeForm.licensePlate
            }
            submit_subscribeForm(subInfo)
                .then(response => {
                    resolve(response)
                })
                .catch(error => reject(error))
        })
    },
    getSubscribeList({
        rootGetters
    }) {
        return new Promise((resolve, reject) => {
            get_subscribeList({
                user_id: rootGetters.userInfo._id,
            })
                .then(response => {
                    resolve(response)
                })
                .catch(error => reject(error))
        })
    },
    getPortAddressList({
        state
    }) {
        return new Promise((resolve, reject) => {
            getPortAddressList({
                transboundary_type: state.transboundaryType
            })
                .then(response => {
                    resolve(response)
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
    SET_portId: (state, data) => {
        state.portId = data
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}