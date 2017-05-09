import React from 'react'
import { connect } from 'react-redux'

import Form from 'components/core/form'
import { Input, MultiInput } from 'components/core/input'
import Select from 'components/core/select'
import Fab from 'components/core/fab'

import { createTransaction, getAutocompleteItems } from 'actions/transaction'

import { required, emptyOr } from 'utils/validators'

class Transaction extends React.Component {
  componentDidMount () {
    this.props.getAutocompleteItems()
  }

  render () {
    let { autocomplete, createTransaction } = this.props

    return (
      <Form
        model='transaction'
        className='Transaction'
        onSubmit={createTransaction}
      >
        <Select
          model='transaction.type'
          options={[
            { title: 'Expense', data: 'expense' },
            { title: 'Income', data: 'income' }
          ]}
        />
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
          validate={value => (autocomplete.currencyCodes || []).indexOf(value) >= 0}
          errorText='Should be valid currency code'
          autocomplete={autocomplete.currencyCodes}
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
        <Fab className='Transaction__fab' />
      </Form>
    )
  }
}

export default connect(
  state => ({
    autocomplete: _.get('transaction.autocomplete', state)
  }),
  { createTransaction, getAutocompleteItems }
)(Transaction)
