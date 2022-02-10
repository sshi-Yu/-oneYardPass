import Request from '@/utils/Request'

export function getPortAddressList(data){
    return Request({
        method: 'get',
        url: '/port/portAddressList',
        params: data
    })
}

export function getSelectablePortsList(data){
    return Request({
        method: 'get',
        url: '/port/getPorts', // 获取可选口岸列表的接口
        params: data
    })
}

export function submit_subscribeForm(data){
    return Request({
        method: 'post',
        url: '/subscribe/sub_subscribe', // 提交预约表单的接口
        data
    })
}

export function get_subscribeList(data){
    return Request({
        method: 'get',
        url: '/subscribe/subscribeList', // 获取所有预约列表的接口
        params: data
    })
}

export function get_subscribeInfo(data){
    return Request({
        method: 'get',
        url: '/subscribe/subscribeInfo',
        params: data
    })
}