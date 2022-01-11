import Request from '@/utils/Request';

export function login(data){
    return Request({
        method: 'post',
        url: '/sys/login',
        data
    })
}