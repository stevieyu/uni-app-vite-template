import {ref, watch} from "vue";

const location = ref(null)
const err = ref('')

const getLocation = async (options = {
    type: 'wgs84',
    altitude: false,
    isHighAccuracy: false,
}) => {
    const {authSetting} = await uni.getSetting();

    let res
    try {
        if (!authSetting['scope.userLocation']) {
            await uni.authorize({scope: 'scope.userLocation'});
        }
        res = await uni.getLocation(options)
    }catch (e){
        if(e.errMsg.includes('authorize:fail')){
            err.value = '位置授权失败，请点击右上角三个点后在设置里进行位置信息授权允许'
        }
        if(e.errMsg.includes('getLocation:fail')){
            err.value = '位置信息获取失败，请开启手机位置信息'
        }
        if(!err.value){
            err.value = e.errMsg
        }
        return;
    }

    delete res.errMsg
    location.value = res
    return location
}


export default (showErr = true) => {
    getLocation()

    if(showErr){
        watch(err, (val) => {
            uni.showToast({
                title: val,
                icon: 'none',
                duration: 5000
            })
        })
    }

    return {
        location,
        err,
        getLocation
    }
}