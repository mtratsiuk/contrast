import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Typography from 'components/core/typography'

import { getTransactions } from 'actions/history'

class History extends React.Component {
  componentDidMount () {
    this.props.getTransactions()
  }

  render () {
    let { items } = this.props

    return (
      <div className='History'>
        <ul className='mdc-list mdc-list--two-line'>
          <Typography type='title'>
            <li className='History__item History__item--head mdc-list-item' key='head'>
              <span className='mdc-list-item__text mdc-list-item__start-detail'>
                <span>Transaction</span>
              </span>
              <span className='mdc-list-item__text'>
                <span>Category/Tags</span>
              </span>
              <span className='mdc-list-item__text mdc-list-item__end-detail'>
                <span>Value</span>
              </span>
            </li>
          </Typography>
          {_.map(transaction =>
            <li className='History__item mdc-list-item' key={transaction._id}>
              <span className='mdc-list-item__text mdc-list-item__start-detail'>
                <span>{transaction.name}</span>
                <span className='mdc-list-item__text__secondary'>{transaction.getFormattedDate()}</span>
              </span>
              <span className='mdc-list-item__text'>
                <span>{transaction.category}</span>
                <span className='mdc-list-item__text__secondary'>{transaction.tags.join(', ')}</span>
              </span>
              <span className='mdc-list-item__text mdc-list-item__end-detail'>
                <span
                  className={classnames('History__item-value', {
                    'History__item-value--income': transaction.type === 'income'
                  })}>
                  {transaction.getFormattedValue()}
                </span>
              </span>
            </li>
          )(items)}
        </ul>
      </div>
    )
  }
}

export default connect(
  _.get('history'),
  { getTransactions }
)(History)
