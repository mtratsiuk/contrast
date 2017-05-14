import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { MDCSelect } from '@material/select'

import { setInput } from 'actions/forms'

const inputConfig = { __isSelect__: true }

class Select extends React.Component {
  componentDidMount () {
    let { options, value } = this.props

    this._setInput(value)

    this._mdcSelect = new MDCSelect(this.element)
    this._mdcSelect.listen('MDCSelect:change', () => {
      this._setInput(options[this._mdcSelect.selectedIndex])
    })
  }

  componentWillUnmount () {
    this._mdcSelect.destroy()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.input == null) {
      this._setInput(nextProps.value)
    }
  }

  _setInput (value) {
    let { model, setInput } = this.props
    setInput(model, value, false, { config: inputConfig })
  }

  render () {
    let { options, value, className, style } = this.props

    return (
      <div className={classnames('Select', className)} style={style}>
        <div
          className='mdc-select'
          role='listbox'
          tabIndex='0'
          ref={el => { this.element = el }}
        >
          <span className='mdc-select__selected-text'>{value.title}</span>
          <div className='mdc-simple-menu mdc-select__menu'>
            <ul className='mdc-list mdc-simple-menu__items'>
              {_.map(option => {
                let aria = option.title === value.title
                   ? { 'aria-selected': true }
                   : {}
                return (
                  <li
                    key={option.title}
                    className='mdc-list-item'
                    role='option'
                    id={option.title}
                    tabIndex='0'
                    {...aria}
                  >
                    {option.title}
                  </li>
                )
              })(options)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const optionShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired
})

Select.propTypes = {
  options: PropTypes.arrayOf(optionShape.isRequired).isRequired,
  value: optionShape,
  model: PropTypes.string.isRequired
}

export default connect(
  (state, { model, getInitialValue = () => '', options }) => {
    return {
      value: _.get(`forms.${model}.value`, state) || getInitialValue() || options[0],
      input: _.get(`forms.${model}`, state)
    }
  },
  { setInput }
)(Select)
