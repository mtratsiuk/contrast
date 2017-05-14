import i18n from 'services/i18n'
import user from 'services/user'

export const saveSettings = ({ currency, language }) => async dispatch => {
  user.setPreferredCurrency(currency)

  if (i18n.getUserLanguage() !== language) {
    await i18n.setLanguage(language)
  }
}
