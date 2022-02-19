import {
    admin_login
} from '@/api/admin'
import {
    getAccessToken,
    setToken,
    setUserId,
} from "@/utils/auth";


const state = {
    token: getAccessToken(),
    auth: [],
    adminInfo: {},
}

const actions = {
    adminLogin({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            admin_login(data)
                .then(response => {
                    if (response.code === '1111') { // 登录成功code=1111 保存token
                        setToken(response.data.accessToken)
                        commit('SET_token', response.data.accessToken)
                        /* commit => set userInfo */
                        commit('SET_adminInfo', response.data.adminInfo)
                        /* cookie保存userid 用于刷新后配合token重新获取用户身份信息 */
                        setUserId(response.data.adminInfo.admin_id)
                        resolve(response.code) // 传递code 登录页面提示成功
                    } else {
                        resolve(response.code) // 传递code 登录页面提示 内容
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

const mutations = {
    SET_adminInfo: (state, data) => {
        state.adminInfo = data
    },
    SET_token: (state, data) => {
        state.token = data
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}