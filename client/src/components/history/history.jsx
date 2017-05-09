import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Typography from 'components/core/typography'
import { filter } from 'components/history/utils'

import { getTransactions } from 'actions/history'
import { getFormData } from 'utils/forms'
import * as currencyService from 'services/currency'

class History extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
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
        <ul className='mdc-list mdc-list--two-line'>
          <Typography type='title'>
            <li className='History__item History__item--head mdc-list-item' key='head'>
              <span className='mdc-list-item__text mdc-list-item__start-detail'>
                <span>Transaction</span>
              </span>
              <span className='History__item-category mdc-list-item__text'>
                <span>Category/Tags</span>
              </span>
              <span className='mdc-list-item__text mdc-list-item__end-detail'>
                <span>Value</span>
              </span>
            </li>
          </Typography>
          {_.pipe(
            _.orderBy('timestamp', 'desc'),
            _.map(transaction =>
              <li className='History__item mdc-list-item' key={transaction._id}>
                <span className='mdc-list-item__text mdc-list-item__start-detail'>
                  <span>{transaction.name}</span>
                  <span className='mdc-list-item__text__secondary'>{transaction.getFormattedDate()}</span>
                </span>
                <span className='History__item-category mdc-list-item__text'>
                  <span>{transaction.category}</span>
                  <span className='mdc-list-item__text__secondary'>{transaction.tags.join(', ')}</span>
                </span>
                <span className='mdc-list-item__text mdc-list-item__end-detail'>
                  <span
                    className={classnames('History__item-value', {
                      'History__item-value--income': transaction.isIncome
                    })}>
                    {transaction.getFormattedValue()}
                  </span>
                </span>
              </li>
            ))(filteredItems)}
        </ul>
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
