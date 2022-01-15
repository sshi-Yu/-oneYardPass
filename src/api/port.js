import Request from '@/utils/Request'

export function getSelectablePortsList(data){
    return Request({
        method: 'get',
        url: '/', // 获取可选口岸列表
        data
    })
}