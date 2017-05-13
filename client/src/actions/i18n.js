import i18n from 'services/i18n'

export const setLanguage = lang => dispatch => {
  return i18n.setLanguage(lang)
}
