import Request from '@/utils/Request'

export function admin_login(data) {
    return Request({
        method: 'post',
        url: '/admin/login',
        data
    })
}

export function get_auditList(data) {
    return Request({
        method: 'get',
        url: '/admin/getAuditList',
        params: data
    })
}