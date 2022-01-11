import {
    getAccessToken,
    setToken
} from "@/utils/auth";
import {
    login
} from '@/api/user';

const state = {
    token: getAccessToken(),
    auth: [],
    userInfo: {},
    equipment: '', // 用户登录设备类型
}

const actions = {
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            login(data)
                .then(response => {
                    if (response.code === 1) { // 登录成功code=1 保存token
                        setToken(response.token)
                        /* commit => set userInfo */
                        commit('SET_userInfo', response.data)
                        resolve(response.code) // 传递code 登录页面提示成功
                    } else {
                        resolve(response.code) // 传递code 登录页面提示 内容
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

const mutations = {
    SET_userInfo: (state, data) => {
        state.userInfo = data
    },
    SET_equipment: (state, data) => {
        state.equipment = data
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}