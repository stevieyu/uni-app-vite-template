import {
    defineConfig,
    presetAttributify,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'
  
import {
    presetApplet,
    presetRemToRpx,
    transformerApplet,
    transformerAttributify,
} from 'unocss-applet'
  
import presetIcons from '@unocss/preset-icons'

// UniApp
const isH5 = process.env.UNI_PLATFORM === 'h5'

// Taro
// const isH5 = process.env.TARO_ENV === 'h5'
  
export default defineConfig({
    presets: [
      /**
       * you can add `presetAttributify()` here to enable unocss attributify mode prompt
       * although preset is not working for applet, but will generate useless css
       */
      presetApplet({ enable: !isH5 }),
      presetAttributify(),
      presetRemToRpx({ enable: !isH5 }),
        /*
        https://icon-sets.iconify.design/fa
        https://icon-sets.iconify.design/fa6-solid
        https://icon-sets.iconify.design/fa6-regular
        https://icon-sets.iconify.design/fa6-brands
        https://icon-sets.iconify.design/ant-design
            */
        presetIcons({}),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
      // Don't change the following order
      transformerAttributify(),
      transformerApplet(),
    ],
})
