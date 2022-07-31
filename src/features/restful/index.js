import stringify from 'qs/lib/stringify'
import {$toast} from '@/supports/feedback'
import throttlePromise from "@/features/common/utils/throttlePromise";

export const stringifyUrl = (path = '', query = {}) => {
    const origin = import.meta.env.VITE_API_ORIGIN || 'http://httpbin.org/anything'
    let uri = path.includes('://') ? path : origin.replace(/\/$/, '')

    if(typeof query === 'object'){
        uri += (uri.includes('?') ?'&':'?') + stringify(query)
    }
    return uri.toString()
}


export const request = async (path = '', method = 'get', data = null, options = {}) => {
    const query = {};
    if(method === 'get' && data) {
        Object.assign(query, data)
        data = null
    }
    const headers = {};
    if(token()) headers['X-Auth-Token'] = token()
    // path = `http://httpbin.org/status/401`
    try{
        const res = await uni.request({
            url: stringifyUrl(path, query),
            data: null,
            header: headers,
            ...options
        });
        const {data, header, statusCode} = res
        if(header['X-Auth-Token']) token(header['X-Auth-Token'])
        errorHandle(statusCode, data)
        return data
    }catch(e){
        console.error(e);
        throw e
    }
}

export const errorToast = (msg, err = null) => {
    if(msg && !errorToast.disable) $toast(msg);
    throw Error(err || msg)
}
const errorHandle = (statusCode, data) => {
    if(statusCode === 403) {
        errorToast(`无权限访问`)
    }
    if(statusCode === 401) {
        token('')
        errorToast(`未登录`)
    }
    if(statusCode >= 500) {
        errorToast('服务器异常不可用！')
    }
    if(statusCode >= 400) {
        errorToast(`错误请求：${statusCode}`)
    }
    if(typeof data === 'object' && data.code >= 1000 && data.msg) {
        errorToast(data.msg)
    }
}

export default {
    get: (path, query)=> throttleRequest(path, 'get', query),
    post: (path, data)=> throttleRequest(path, 'post', data),
    put: (path, data)=> throttleRequest(path, 'put', data),
    delete: (path, data)=> throttleRequest(path, 'delete', data),
}

export const token = (token) => {
    const key = 'token'
    if((token !== undefined && !token) && token){
        uni.setStorageSync(key, token || '')
    }
    return uni.getStorageSync(key) || ''
}

export const throttleRequest = throttlePromise(request)