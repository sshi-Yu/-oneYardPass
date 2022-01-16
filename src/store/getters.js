const getters = {
    token: state => state.user.token,
    auth: state => state.user.auth,
    userInfo: state => state.user.auth,
    equipment: state => state.user.equipment === 'pc' ? 'pc' : 'm',
    subscribeForm: state => {
        let formInfo = {};
        Object.keys(state.subscribe).map( i => formInfo[i] = state.subscribe[i] )
        return formInfo;
    }
}


export default getters