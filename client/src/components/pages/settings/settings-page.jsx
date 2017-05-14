import Form from 'components/core/form'
import Select from 'components/core/select'
import CurrencyInput from 'components/transaction/currency-input'
import withTranslations from 'components/core/i18n'
import Fab from 'components/core/fab'

import i18n from 'services/i18n'
import user from 'services/user'
import { saveSettings } from 'actions/settings'

const SettingsPage = ({ t, dispatch }) => {
  let languages = i18n.getAvailableLanguages()
  let currentLanguage = i18n.getUserLanguage()

  return (
    <Form
      model='settings'
      className='SettingsPage'
      onSubmit={formData => dispatch(saveSettings(formData))}
      clearAfterSubmit={false}
    >
      <CurrencyInput
        model='settings.currency'
        getInitialValue={() => user.getPreferredCurrency()}
        label={t('settings_page.currency_label')}
        errorText={t('settings_page.currency_error')}
      />
      <Select
        model='settings.language'
        options={languages}
        getInitialValue={() => _.find(x => x.data === currentLanguage, languages)}
      />
      <Fab className='SettingsPage__fab' />
    </Form>
  )
}

export default withTranslations(SettingsPage)
