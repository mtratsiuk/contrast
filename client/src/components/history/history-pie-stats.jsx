import React from 'react'
import PieChart from 'react-svg-piechart'
import classnames from 'classnames'

import { calculateBalanceSync, getRates, format } from 'services/currency'
import withAsyncProps from 'components/core/withAsyncProps'
import { getRandomColor } from 'utils/color'

const palette = [
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#1abc9c'
]

class HistoryPieStats extends React.Component {
  constructor (props) {
    super(props)
    this.state = { expandedSector: null, ...this.getData(this.props) }

    this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState(this.getData(nextProps))
    }
  }

  getData (props) {
    let { items, rates } = props

    if (!items || !items.length) return { data: null }

    let grouped = _.groupBy('category', items)
    let data = Object.keys(grouped).map((category, index) => {
      let transactions = grouped[category]
      let balance = calculateBalanceSync(transactions, rates)
      return {
        label: category,
        value: Math.abs(balance),
        formattedValue: format(balance),
        color: palette[index] || getRandomColor()
      }
    })

    return { data }
  }

  handleMouseEnterOnSector (sector) {
    this.setState({ expandedSector: sector })
  }

  render () {
    let { expandedSector, data } = this.state

    if (!data) return null

    return (
      <div className='HistoryPieStats'>
        <PieChart
          data={data}
          expandOnHover
          expandedSector={expandedSector}
          onSectorHover={this.handleMouseEnterOnSector}
          sectorStrokeWidth={2}
          expandPx={5}
        />
        <div className='HistoryPieStats__legend'>
          {
            _.mapi(({ color, label, formattedValue }, index) => (
              <div
                onMouseEnter={() => this.handleMouseEnterOnSector(index)}
                onMouseLeave={() => this.handleMouseEnterOnSector(null)}
                className={classnames('HistoryPieStats-legend', {
                  'HistoryPieStats-legend--expand': index === expandedSector
                })}
                key={index}>
                <div
                  className='HistoryPieStats-legend__color'
                  style={{ background: color }}
                />
                <div className='HistoryPieStats-legend__value'>
                  {`${label}: ${formattedValue}`}
                </div>
              </div>
            ))(data)
          }
        </div>
      </div>
    )
  }

}

export default withAsyncProps({ rates: getRates() })(HistoryPieStats)
