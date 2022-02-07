import Request from '@/utils/Request'

export function phoneVCode(data){
    return Request({
        method: 'post',
        url: '/sms/sendPhoneVCode',
        data
    })
}

export function createQRcode(data){
    return Request({
        method: 'post',
        url: '////', // 获取二维码所需要保存的信息
        data
    })
}

