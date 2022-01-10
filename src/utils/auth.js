import Cookie from 'js-cookie'

const accessTokenKey = 'At'

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