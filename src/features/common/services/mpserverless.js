import MPServerless from '@alicloud/mpserverless-sdk';

const mpserverless = new MPServerless(wx, {
    appId: 'wxa0ab4ce15fd08580',
    spaceId: 'mp-d1aa516e-8433-4329-aea0-c0f55ef5167a',
    clientSecret: 'vtbpzt7pXyCSpV7qMy3IWA==',
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