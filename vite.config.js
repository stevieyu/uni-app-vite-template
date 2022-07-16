import { defineConfig, splitVendorChunkPlugin } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite';
import presetMini from '@unocss/preset-mini'
import presetIcons from '@unocss/preset-icons'

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
    unocss({
      presets: [
        /*
        https://icon-sets.iconify.design/fa
        https://icon-sets.iconify.design/fa6-solid
        https://icon-sets.iconify.design/fa6-regular
        https://icon-sets.iconify.design/fa6-brands
        https://icon-sets.iconify.design/ant-design
         */
        presetIcons({}),
        (() => {
          const preset = presetMini()
          preset.preflights = []
          return preset
        })(),
      ],
    }),
  ],
})
