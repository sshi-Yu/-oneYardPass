const getters = {
    token: state => state.user.token,
    auth: state => state.user.auth,
    userInfo: state => state.user.auth,
    equipment: state => state.user.equipment === 'pc' ? 'pc' : 'm',
}

export default getters