const getters = {
    token: state => state.user.token || state.admin.token, // 获取user或admin登录成功后的token
    auth: state => state.user.auth,
    userInfo: state => state.user.userInfo,
    equipment: state => state.user.equipment === 'pc' ? 'pc' : 'm',
    subscribeForm: state => {
        let formInfo = {};
        Object.keys(state.subscribe).map( i => formInfo[i] = state.subscribe[i] )
        return formInfo;
    },
    adminInfo: state => state.admin.adminInfo,
}


export default getters