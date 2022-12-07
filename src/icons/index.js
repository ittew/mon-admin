import SvgIcon from '@/components/SvgIcon/index.vue'

export default app => {
  app.component('svgIcon', SvgIcon)
}

const svgRequire = require.context('./svg/', false, /\.svg$/)
svgRequire.keys().forEach(item => {
  svgRequire(item)
})
