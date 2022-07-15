import URL from 'url-parse'
import parse from 'qs/lib/parse'
import stringify from 'qs/lib/stringify'

export const url = (path = '', query = {}) => {
    const origin = import.meta.env.VITE_API_ORIGIN || 'http://httpbin.org'
    const uri = new URL(path.includes('://') ? path : `${origin}/anything`)
    if(!path.includes('://')) uri.pathname = (uri.pathname + path).replace('//')
    if(Object.keys(query).length){
        uri.query = stringify(Object.assign({}, parse(uri.query.replace('?', '')), query))
    }
    return uri.toString()
}


export const request = async (path = '', method = 'get', data = null, options = {}) => {
    const query = {};
    if(method === 'get' && data) {
        Object.assign(query, data)
        data = null
    }
    // path = `http://httpbin.org/status/401`
    try{
        const res = await uni.request({
            url: url(path, query),
            data: null,
            header: {
                'X-Auth-Token': token()
            },
            ...options
        });
        const {data, header, statusCode} = res
        if(header['X-Auth-Token']) token(header['X-Auth-Token'])
        errorHandle(statusCode, data)
        return data
    }catch(e){
        throw e
    }
}

const errorToast = (msg, err = null) => {
    if(msg) uni.showToast({
        title: msg,
        duration: 2000
    })
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
    get: (path, query)=> request(path, 'get', query),
    post: (path, data)=> request(path, 'post', data),
    put: (path, data)=> request(path, 'put', data),
    delete: (path, data)=> request(path, 'delete', data),
}

export const token = (token) => {
    const key = 'token'
    if((token !== undefined && !token) && token){
        uni.setStorageSync(key, token || '')
    }
    return uni.getStorageSync(key) || ''
}