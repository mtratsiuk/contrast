import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { filter } from 'components/history/utils'

import { getTransactions } from 'actions/history'
import { getFormData } from 'utils/forms'
import * as currencyService from 'services/currency'

class History extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.renderTransaction = this.renderTransaction.bind(this)
  }

  componentDidMount () {
    this.props.getTransactions()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.items !== nextProps.items ||
      this.props.filterQuery !== nextProps.filterQuery) {
      this.setHistory(nextProps)
    }
  }

  async setHistory (props) {
    let { items, filterQuery } = props
    let filteredItems = filter(items, getFormData(filterQuery))
    return this.setState({
      filteredItems,
      result: await currencyService.calculateBalance(filteredItems)
    })
  }

  render () {
    let { filteredItems, result } = this.state

    return (
      <div className='History'>
        <div className='History__results'>
          {result != null &&
            `Results: ${filteredItems.length} transactions, ${currencyService.format(result)} total`
          }
        </div>
        <div className='History__items'>
          {_.pipe(
            _.orderBy('timestamp', 'desc'),
            _.map(this.renderTransaction)
          )(filteredItems)}
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
    items: _.get('history.items', state),
    filterQuery: _.get('forms.historyFilters', state)
  }),
  { getTransactions }
)(History)
