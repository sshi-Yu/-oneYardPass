import Request from '@/utils/Request'

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
        url: '/port/apply', // 提交预约表单的接口
        data
    })
}

export function get_subscribeList(data){
    return Request({
        method: 'get',
        url: '/', // 获取所有预约列表的接口
        data
    })
}