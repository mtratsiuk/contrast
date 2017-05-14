import React from 'react'

import { Input } from 'components/core/input'
import { getCurrencyCodes } from 'services/currency'

class CurrencyInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currencyCodes: []
    }
  }

  async componentDidMount () {
    this.setState({
      currencyCodes: await getCurrencyCodes()
    })
  }

  render () {
    let { currencyCodes } = this.state

    if (!currencyCodes.length) return null

    return (
      <Input
        {...this.props}
        validate={value => (currencyCodes || []).indexOf(value) >= 0}
        autocomplete={currencyCodes}
      />
    )
  }
}

export default CurrencyInput
