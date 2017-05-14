import React from 'react'
import { connect } from 'react-redux'

import Form from 'components/core/form'
import { Input, MultiInput } from 'components/core/input'
import CurrencyInput from 'components/transaction/currency-input'
import Select from 'components/core/select'
import Fab from 'components/core/fab'
import withTranslations from 'components/core/i18n'

import { createTransaction, getAutocompleteItems } from 'actions/transaction'

import { required, emptyOr } from 'utils/validators'

class Transaction extends React.Component {
  componentDidMount () {
    this.props.getAutocompleteItems()
  }

  render () {
    let { autocomplete, createTransaction, t } = this.props

    return (
      <Form
        model='transaction'
        className='Transaction'
        onSubmit={createTransaction}
      >
        <Select
          model='transaction.type'
          options={[
            { title: t('expense'), data: 'expense' },
            { title: t('income'), data: 'income' }
          ]}
        />
        <Input
          model='transaction.value'
          label={t('transaction_form.value_label')}
          validate={value => _.isFinite(+value)}
          errorText={t('transaction_form.value_error')}
          required
          style={{ width: '60%' }}
        />
        <CurrencyInput
          model='transaction.currency'
          label={t('transaction_form.currency_label')}
          errorText={t('transaction_form.currency_error')}
          required
          style={{ width: '35%' }}
        />
        <Input
          model='transaction.name'
          label={t('transaction_form.name_label')}
          validate={required}
          errorText={t('transaction_form.name_error')}
          autocomplete={autocomplete.names}
          required
        />
        <Input
          model='transaction.category'
          validate={emptyOr(required)}
          autocomplete={autocomplete.categories}
          label={t('transaction_form.category_label')}
        />
        <MultiInput
          model='transaction.tags'
          validate={emptyOr(required)}
          autocomplete={autocomplete.tags}
          label={t('transaction_form.tags_label')}
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
)(withTranslations(Transaction))
