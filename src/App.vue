<script>
import mpserverless from "@/features/common/services/mpserverless";
import useLocation from "@/features/common/services/useLocation";
export default {
  async onLaunch () {
    console.time('App Launch')
    const res = await mpserverless.init()
    console.log('mpserverless', mpserverless)
    if(!res.success) console.error('mpserverless init', res)
    console.timeEnd('App Launch')
    console.log('mpserverless', mpserverless)
  },
  onShow: function () {
    // console.log('App Show')
    useLocation()
  },
  onHide: function () {
    // console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
</style>
