import Vue from 'vue'

import Heading from '@/components/Heading'
import NImage from '@/components/NImage'
import RichText from '@/components/RichText'
import LinkWrapper from '@/components/LinkWrapper'
import Icon from '@/components/Icon'
import Arrow from '@/components/Arrow'
import Btn from '@/components/Btn'
// import LinkWrapper from '@/components/LinkWrapper'
// import LazyImage from '@/components/LazyImage'

export default () => {
  Vue.component('Heading', Heading)
  Vue.component('NImage', NImage)
  Vue.component('RichText', RichText)
  Vue.component('LinkWrapper', LinkWrapper)
  Vue.component('Icon', Icon)
  Vue.component('Arrow', Arrow)
  Vue.component('Btn', Btn)
  // Vue.component('LinkWrapper', LinkWrapper)
  // Vue.component('LazyImage', LazyImage)
}
