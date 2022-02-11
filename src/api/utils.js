import Request from '@/utils/Request'

export function phoneVCode(data){
    return Request({
        method: 'post',
        url: '/sms/sendPhoneVCode',
        data
    })
}

export function submit_driverForm(data){
    return Request({
        method: 'post',
        url: '/driver/append',
        data
    })
}

