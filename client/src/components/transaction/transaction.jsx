import React from 'react'
import { connect } from 'react-redux'

import Form from 'components/core/form'
import { Input, MultiInput } from 'components/core/input'
import Fab from 'components/core/fab'

import { createTransaction, getAutocompleteItems } from 'actions/transaction'

import currencyCodes from 'services/currency/currency-codes'
import { required, emptyOr } from 'utils/validators'
import { getFormData } from 'utils/forms'

class Transaction extends React.Component {
  componentDidMount () {
    this.props.getAutocompleteItems()
  }

  render () {
    let { form, autocomplete, createTransaction } = this.props

    return (
      <Form
        model='transaction'
        className='Transaction'
        onSubmit={() => createTransaction(getFormData(form))}
      >

        <Input
          model='transaction.value'
          label='Value'
          validate={required}
          errorText='Transaction value is required'
          required
          style={{ width: '60%' }}
        />
        <Input
          model='transaction.currency'
          label='Currency'
          validate={value => currencyCodes.indexOf(value) >= 0}
          errorText='Should be valid currency code'
          autocomplete={currencyCodes}
          required
          style={{ width: '35%' }}
        />
        <Input
          model='transaction.name'
          label='Name'
          validate={required}
          errorText='Transaction name is required'
          autocomplete={autocomplete.names}
          required
        />
        <Input
          model='transaction.category'
          validate={emptyOr(required)}
          autocomplete={autocomplete.categories}
          label='Category'
        />
        <MultiInput
          model='transaction.tags'
          validate={emptyOr(required)}
          autocomplete={autocomplete.tags}
          label='Tag'
        />

        <Fab fixed />
      </Form>
    )
  }
}

export default connect(
  state => ({
    form: _.get('forms.transaction', state),
    autocomplete: _.get('transaction.autocomplete', state)
  }),
  { createTransaction, getAutocompleteItems }
)(Transaction)
