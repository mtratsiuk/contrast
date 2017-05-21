import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { push } from 'react-router-redux'

import withTranslations from 'components/core/i18n'
import HistoryPieStats from 'components/history/history-pie-stats'

import { loadTransactions } from 'actions/transactions'

class History extends React.Component {
  constructor (props) {
    super(props)
    this.renderTransaction = this.renderTransaction.bind(this)
  }

  componentDidMount () {
    this.props.loadTransactions()
  }

  render () {
    let { items, t } = this.props

    return (
      <div className='History'>
        <div className='History__body'>
          <div className='History__items'>
            {_.pipe(
              _.orderBy('timestamp', 'desc'),
              _.map(this.renderTransaction)
            )(items)}
          </div>
          <div className='History__pie-stats'>
            <HistoryPieStats items={items.filter(x => x.isExpense)} title={t('expense')} t={t} />
            <HistoryPieStats items={items.filter(x => x.isIncome)} title={t('income')} t={t} />
          </div>
        </div>
      </div>
    )
  }

  renderTransaction (transaction) {
    return (
      <div className='History__item' key={transaction._id} onClick={() => this.props.push(`/transaction/${transaction._id}`)}>
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
    items: _.get('transactions.filtered', state)
  }),
  { loadTransactions, push }
)(withTranslations(History))
