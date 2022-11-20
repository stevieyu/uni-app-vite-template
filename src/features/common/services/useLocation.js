import {reactive} from "vue";

const location = reactive({})

const getLocation = async (options = {
    type: 'wgs84',
    altitude: false,
    isHighAccuracy: false,
}) => {
    const {authSetting} = await uni.getSetting();
    if (!authSetting['scope.userLocation']) {
        await uni.authorize({scope: 'scope.userLocation'});
    }

    const res = await uni.getLocation(options)
    delete res.errMsg

    Object.assign(location, res)
    return location
}


export default () => {
    getLocation()

    return {
        location,
        getLocation
    }
}