import { defineConfig, splitVendorChunkPlugin } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite';
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: false,
  },
  plugins: [
    splitVendorChunkPlugin(),
    uni({
      vueOptions:{
        reactivityTransform: true,
      }
    }),
    unocss({
      presets: [],
    }),
  ],
})
