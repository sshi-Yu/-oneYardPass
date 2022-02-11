import Request from '@/utils/Request';

export function login(data){
    return Request({
        method: 'post',
        url: '/user/login',
        data
    })
}

export function regist(data){
    return Request({
        method: 'post',
        url: '/user/regist',
        data
    })
}

export function complete_information(data){
    return Request({
        method: 'post',
        url: '/user/complete',
        data
    })
}

export function refresh_userInfo(data){
    return Request({
        method: 'post',
        url: '/user/refresh',
        data
    })
}