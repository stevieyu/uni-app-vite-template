import {ref} from "vue";

const location = ref(uni.getStorageSync('location'))
const err = ref('')

export const getLocation = async (options = {
    type: 'wgs84',
    altitude: false,
    isHighAccuracy: false,
}) => {
    if(location.value) return location.value;
    const {authSetting} = await uni.getSetting();

    let res
    try {
        if (!authSetting['scope.userLocation']) {
            await uni.authorize({scope: 'scope.userLocation'});
        }
        res = await uni.getLocation(options)
    }catch (e){
        if(e.errMsg.includes('authorize:fail')){
            throw new Error('位置授权失败，请点击右上角三个点后在设置里进行位置信息授权允许')
        }
        if(e.errMsg.includes('getLocation:fail')){
            throw new Error('位置信息获取失败，请开启手机位置信息')
        }
        throw new Error(e.errMsg)
    }

    delete res.errMsg
    location.value = res
    uni.setStorageSync('location', res)
    return res
}


export default (showErr = true) => {
    getLocation().catch(e => {
        err.value = e.message
        if(!showErr) return
        uni.showToast({
            title: e.message,
            icon: 'none',
            duration: 5000
        })
    })

    return {
        location,
        err,
        getLocation
    }
}