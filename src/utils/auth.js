import Cookie from 'js-cookie'

const accessTokenKey = 'At'
const user_id = 'u_id'

/**
 * 解析cookie中保持的token
 * @returns accessTokenValue
 */
export function getAccessToken(){
    return Cookie.get(accessTokenKey)
}

export function setToken(at){
    Cookie.set(accessTokenKey, at)
}

export function setUserId(userId){
    Cookie.set(user_id, userId)
}

export function getUserId(){
    return Cookie.get(user_id)
}

export function removeLoginToken(){
    Cookie.remove(accessTokenKey, { path: '' })
    Cookie.remove(user_id, { path: '' })
}