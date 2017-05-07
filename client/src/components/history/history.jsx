import React from 'react'
import { connect } from 'react-redux'

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
          {_.map(transaction =>
            <li className='mdc-list-item' key={transaction._id}>
              <span className='mdc-list-item__text mdc-list-item__start-detail'>
                <span>{transaction.name}</span>
                <span className='mdc-list-item__text__secondary'>{transaction.getFormattedDate()}</span>
              </span>
              <span className='mdc-list-item__text'>
                <span>{transaction.category}</span>
                <span className='mdc-list-item__text__secondary'>{transaction.tags.join(', ')}</span>
              </span>
              <span className='mdc-list-item__text mdc-list-item__end-detail'>
                <span>{transaction.getFormattedValue()}</span>
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
