import Request from '@/utils/Request'

export function admin_login(data) {
    return Request({
        method: 'post',
        url: '/admin/login',
        data
    })
}

export function get_pendingList(data) {
    return Request({
        method: 'get',
        url: '/admin/pendingList',
        params: data
    })
}

export function get_doneList(data) {
    return Request({
        method: 'get',
        url: '/admin/doneList',
        params: data
    })
}

export function refresh_adminInfo(data){
    return Request({
        method: 'post',
        url: '/admin/refresh',
        data
    })
}

export function reject(data){
    return Request({
        method: 'post',
        url: '/admin/reject',
        data
    })
}

export function approve(data){
    return Request({
        method: 'post',
        url: '/admin/approve',
        data
    })
}

export function delete_subscribeItem(data){
    return Request({
        method: 'get',
        url: '/admin/delete',
        params: data
    })
}