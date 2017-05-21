import React from 'react'
import { connect } from 'react-redux'

import Form from 'components/core/form'
import { Input, MultiInput } from 'components/core/input'
import CurrencyInput from 'components/transaction/currency-input'
import Select from 'components/core/select'
import Fab from 'components/core/fab'
import withTranslations from 'components/core/i18n'

import { createTransaction, deleteTransaction, loadTransactions } from 'actions/transactions'
import { clearForm } from 'actions/forms'
import user from 'services/user'

import { required, emptyOr } from 'utils/validators'

class Transaction extends React.Component {
  componentDidMount () {
    this.props.loadTransactions()
  }

  componentWillUnmount () {
    this.props.clearForm('transaction')
  }

  render () {
    let { autocomplete, createTransaction, deleteTransaction, id, transaction, t } = this.props

    if (id && !transaction) return null

    return (
      <div className='Transaction__wrapper'>
        <Form
          model='transaction'
          className='Transaction'
          onSubmit={formData => {
            if (id && transaction) {
              return createTransaction({ ...transaction, ...formData }, true)
            }
            createTransaction(formData)
          }}
        >
          <Select
            model='transaction.type'
            options={[
              { title: t('expense'), data: 'expense' },
              { title: t('income'), data: 'income' }
            ]}
            getInitialValue={() => {
              let type = _.get('type', transaction)
              return type && { title: t(type), data: type }
            }}
          />
          <Input
            model='transaction.value'
            getInitialValue={() => _.get('value', transaction)}
            label={t('transaction_form.value_label')}
            validate={value => value && _.isFinite(+value)}
            errorText={t('transaction_form.value_error')}
            required
            style={{ width: '60%' }}
          />
          <CurrencyInput
            model='transaction.currency'
            getInitialValue={() => _.get('currency', transaction) || user.getPreferredCurrency()}
            label={t('transaction_form.currency_label')}
            errorText={t('transaction_form.currency_error')}
            required
            style={{ width: '35%' }}
          />
          <Input
            model='transaction.name'
            getInitialValue={() => _.get('name', transaction)}
            label={t('transaction_form.name_label')}
            validate={required}
            errorText={t('transaction_form.name_error')}
            autocomplete={autocomplete.names}
            required
            style={{ width: '60%' }}
          />
          <Input
            model='transaction.timestamp'
            type='date'
            validate={value => {
              return value === '' ||
                /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(value) &&
                !!(new Date(value)).getTime()
            }}
            getInitialValue={() =>
              (transaction &&
                new Date(_.get('timestamp', transaction)) ||
                new Date()
              )
                .toISOString().substr(0, 10)
            }
            helpText={t('transaction_form.timestamp_label')}
            style={{ width: '35%' }}
          />
          <Input
            model='transaction.category'
            getInitialValue={() => _.get('category', transaction)}
            validate={emptyOr(required)}
            autocomplete={autocomplete.categories}
            label={t('transaction_form.category_label')}
          />
          <MultiInput
            model='transaction.tags'
            getInitialValue={() => _.get('tags', transaction)}
            validate={emptyOr(required)}
            autocomplete={autocomplete.tags}
            label={t('transaction_form.tags_label')}
          />
          <Fab className='Transaction__fab' />
        </Form>
        {id &&
          <Fab
            icon='clear'
            className='Transaction__fab Transaction__remove'
            onClick={event => {
              deleteTransaction(transaction)
              clearForm('transaction')
            }}
          />
        }
      </div>
    )
  }
}

export default connect(
  (state, { id }) => {
    return {
      autocomplete: _.get('transactions.autocomplete', state),
      transaction: id && _.find(t => t._id === id, _.get('transactions.all', state))
    }
  },
  { createTransaction, loadTransactions, deleteTransaction, clearForm }
)(withTranslations(Transaction))
