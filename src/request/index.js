export const url = (path = '', query = {}) => {
    const origin = import.meta.env.VITE_API_ORIGIN || 'http://httpbin.org'
    const uri = new URL(path.includes('://') ? path : `${origin}/anything`)
    if(!path.includes('://')) uri.pathname = (uri.pathname + path).replace('//')
    for(let k of Object.keys(query)){
        uri.searchParams.set(k, query[k])
    }
    return uri.toString()
}


export const request = async (path = '', method = 'get', data = null, options = {}) => {
    const query = {};
    if(method === 'get' && data) {
        Object.assign(query, data)
        data = null
    }

    try{
        const {errMsg, data} = await uni.request({
            url: url(path, query),
            data: null,
            header: {
                // 'X-Auth-Token': ''
            },
            ...options
        });
        errorHandle(errMsg, data)
        return data
    }catch(e){
        throw e
    }
}

const errorHandle = (errMsg, data) => {
    if(errMsg !== 'request:ok') {
        throw Error(errMsg)
    }
    if(data.code >= 1000) {
        throw Error(data.msg)
    }
}

export default {
    get: (path, query)=> request(path, 'get', query),
    post: (path, data)=> request(path, 'post', data),
    put: (path, data)=> request(path, 'put', data),
    delete: (path, data)=> request(path, 'delete', data),
}