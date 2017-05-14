import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import withTranslations from 'components/core/i18n'

import { loadTransactions } from 'actions/transactions'
import * as currencyService from 'services/currency'

class History extends React.Component {
  constructor (props) {
    super(props)
    this.renderTransaction = this.renderTransaction.bind(this)
  }

  componentDidMount () {
    this.props.loadTransactions()
  }

  render () {
    let { items, result, t } = this.props

    return (
      <div className='History'>
        {result != null &&
          <div className='History__results'>
            <div className='History__results-header'>{t('history_list.results')}:</div>
            <div className='History__results-body'>
              {t('history_list.results_body', {
                count: items.length,
                value: currencyService.format(result)
              })}
            </div>
          </div>
        }
        <div className='History__items'>
          {_.pipe(
            _.orderBy('timestamp', 'desc'),
            _.map(this.renderTransaction)
          )(items)}
        </div>
      </div>
    )
  }

  renderTransaction (transaction) {
    return (
      <div className='History__item' key={transaction._id}>
        <div className='History-item__group'>
          <div className='History-item__main'>{transaction.name}</div>
          <div className='History-item__secondary'>{transaction.getFormattedDate()}</div>
        </div>
        <div className='History-item__group'>
          {transaction.category && <div className='History-item__main'>{transaction.category}</div>}
          {transaction.tags && <div className='History-item__secondary'>{transaction.tags.join(', ')}</div>}
        </div>
        <div className={classnames('History-item__group', 'History-item__value', {
          'History-item__value--income': transaction.isIncome
        })}>
          <div className='History-item__main'>{transaction.getFormattedValue()}</div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    items: _.get('transactions.filtered', state),
    result: _.get('transactions.filteredBalance', state)
  }),
  { loadTransactions }
)(withTranslations(History))
