import { defineConfig, splitVendorChunkPlugin } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  transpileDependencies:['@dcloudio/uni-ui'],
  define: {
    // __VUE_OPTIONS_API__: false, // 兼容问题， 小程序还是注释掉这个
  },
  plugins: [
    splitVendorChunkPlugin(),
    uni({
      vueOptions:{
        reactivityTransform: true,
      }
    }),
    unocss(),
  ],
})
