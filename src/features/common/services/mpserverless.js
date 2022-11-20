import MPServerless from '@alicloud/mpserverless-sdk';

const mpserverless = new MPServerless(wx, {
    appId: import.meta.env.VITE_MPS_APPID,
    spaceId: import.meta.env.VITE_MPS_SPACEID,
    clientSecret: import.meta.env.VITE_MPS_CLIENTSECRET,
    endpoint: 'https://api.next.bspapp.com',
});

// https://help.aliyun.com/document_detail/196765.html
export const invoke = mpserverless.function.invoke;

// https://help.aliyun.com/document_detail/196766.html
export const collection = mpserverless.db.collection;

// https://help.aliyun.com/document_detail/196783.html
export const uploadFile = mpserverless.file.uploadFile;

// https://help.aliyun.com/document_detail/196784.html
export const deleteFile = mpserverless.file.deleteFile;

// https://help.aliyun.com/document_detail/196786.html
export const getInfo = mpserverless.user.getInfo;

export const me = async () => {
    const {success, result: {user}} = await getInfo()
    if(!success) throw new Error('fetch me fail');
    return user;
}

export default mpserverless