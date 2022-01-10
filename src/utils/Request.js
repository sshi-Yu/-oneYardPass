import axios from "axios";
import qs from 'qs';
import {
    getAccessToken,
    setToken
} from './auth.js';

/**
 * 设置默认baseURL 超时时间 是否允许携带凭证 
 */
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.timeout = 10000 // 响应超时10s
axios.defaults.withCredtials = true // 携带凭证
axios.defaults.transformRequest = data => {
    return data instanceof FormData ? data : qs.stringify(data, {
        allowDots: true
    })
} // post请求请求体

/**
 * 请求拦截器
 * 每次发送请求前将token带上
 */
axios.interceptors.request.use(
    config => {
        const resToken = getAccessToken();
        if (resToken) {
            config.headers['AccessToken'] = resToken;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

function Request(config) {
    return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
                if (response.headers.status === 401) {
                    location.reload()
                    /* 401 刷新页面 */
                }
                const res = response.data;
                // 200 300 登陆成功 设置token
                setToken(res.AccessToken)
                resolve(res)
            })
            .catch(error => {
                reject(error);// 错误 pending => reject
            })
    })
}

export default Request;