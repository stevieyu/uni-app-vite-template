import MPServerless from '@alicloud/mpserverless-sdk';

const mpserverless = new MPServerless(wx, {
    appId: import.meta.env.VITE_MPS_APPID,
    spaceId: import.meta.env.VITE_MPS_SPACEID,
    clientSecret: import.meta.env.VITE_MPS_CLIENTSECRET,
    endpoint: 'https://api.next.bspapp.com',
});

let initialized = false;
const init = async () => {
    if(initialized) return
    initialized = true
    const {success} = await mpserverless.init()
    if(!success) throw new Error('mpserverless init fail')
}
init()
// (async() => (await mpserverless.init()).success || console.error('mpserverless init fail'))()

// https://help.aliyun.com/document_detail/196765.html
export const invoke = mpserverless.function.invoke;

// https://help.aliyun.com/document_detail/196766.html
/**
 *
 * @param name
 * @returns {import('@alicloud/mpserverless-sdk/dist/esm/db/mongo/model/query.d.ts').QueryService}
 */
export const collection = (name) => {
    init()
    const doc = mpserverless.db.collection(name);

    const methods = {}
    for (const method of 'find,findOne,insertOne,updateOne,findOneAndUpdate,aggregate'.split(',')){
        methods[method] = async (...args) => {
            const {success, result} = await doc[method](...args)
            if(!success) throw Error(`collection ${name} ${method} fail`);
            return result
        }
    }

    return methods
}

// https://help.aliyun.com/document_detail/196783.html
export const uploadFile = mpserverless.file.uploadFile;

// https://help.aliyun.com/document_detail/196784.html
export const deleteFile = mpserverless.file.deleteFile;

// https://help.aliyun.com/document_detail/196786.html
export const me = async () => {
    await init()
    const {success, result} = await mpserverless.user.getInfo()
    if(!success) throw new Error('fetch me fail');
    return result?.user;
}

export default mpserverless