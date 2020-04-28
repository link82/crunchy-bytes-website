import { localize, extend, setInteractionMode } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import it from 'vee-validate/dist/locale/it.json'

export default ({ app }) => {
  extend('required', required)
  extend('email', email)
  setInteractionMode('eager')

  if (app.i18n.locale === 'it') {
    localize('it', it)
  }
}
