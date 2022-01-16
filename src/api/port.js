import Request from '@/utils/Request'

export function getSelectablePortsList(data){
    return Request({
        method: 'get',
        url: '/', // 获取可选口岸列表的接口
        data
    })
}

export function submit_subscribeForm(data){
    return Request({
        method: 'post',
        url: '/', // 提交预约表单的接口
        data
    })
}