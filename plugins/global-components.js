import Vue from 'vue'

import Heading from '@/components/Heading'
import NImage from '@/components/NImage'
import RichText from '@/components/RichText'
// import Btn from '@/components/Btn'
// import Icon from '@/components/Icon'
// import LinkWrapper from '@/components/LinkWrapper'
// import LazyImage from '@/components/LazyImage'

export default () => {
  Vue.component('Heading', Heading)
  Vue.component('NImage', NImage)
  Vue.component('RichText', RichText)
  // Vue.component('Icon', Icon)
  // Vue.component('Btn', Btn)
  // Vue.component('LinkWrapper', LinkWrapper)
  // Vue.component('LazyImage', LazyImage)
}
