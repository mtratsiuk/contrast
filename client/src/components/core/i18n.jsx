import React from 'react'
import { connect } from 'react-redux'

import { t } from 'services/i18n'

export const withTranslations = Component => connect(
  _.get('i18n')
)(class WithTranslations extends React.Component {
  render () {
    if (!this.props.language) return null
    return <Component {...this.props} t={t} />
  }
})

export default withTranslations
