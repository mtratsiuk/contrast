import storage from 'utils/storage'
import store from 'store'

const LANG_KEY = 'lang'

class I18n {
  constructor () {
    this._source = null
    this.setLanguage(this.getUserLanguage())
  }

  get (key, data) {
    let translation = _.get(key, this._source)
    return translation ? translation(data) : key
  }

  async setLanguage (lang) {
    this._source = await this._loadTranslations(lang)
    storage.set(LANG_KEY, lang)
    return store.dispatch({
      type: 'I18N.SET_LANGUAGE',
      payload: lang
    })
  }

  getUserLanguage () {
    return storage.get(LANG_KEY) || 'en'
  }

  getAvailableLanguages () {
    return [
      { title: 'English', data: 'en' },
      { title: 'Русский', data: 'ru' }
    ]
  }

  async _loadTranslations (lang) {
    let compileTemplates = value => {
      return typeof value === 'string'
        ? _.template(value)
        : _.mapValues(compileTemplates, value)
    }

    return _.mapValues(compileTemplates, require(`./${lang}.json`))
  }
}

export default new I18n()
