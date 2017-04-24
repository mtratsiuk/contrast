import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Autocomplete from 'react-autocomplete'
import { MDCTextfield } from '@material/textfield'

import { setInput, setInputValidation } from 'actions/forms'
import { autocompleteFilter, autocompleteSort } from './utils'

class Input extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount () {
    let { dispatch, model, value } = this.props
    this._mdcTextfield = new MDCTextfield(this.element)

    dispatch(setInput(model, value, !this.validate(value)))
  }

  componentWillUnmount () {
    let { type, model, dispatch } = this.props

    this._mdcTextfield.destroy()
    if (type === 'password') {
      dispatch(setInput(model, ''))
    }
  }

  componentWillReceiveProps (nextProps) {
    let { dispatch } = this.props

    if (this.props.form !== nextProps.form) {
      let isValid = this.validate(nextProps.value, nextProps.form)
      if (!nextProps.invalid !== isValid) {
        dispatch(setInputValidation(nextProps.model, !isValid))
      }
    }
  }

  handleChange (value) {
    let { dispatch, model } = this.props
    this._dirty = true
    dispatch(setInput(model, value, !this.validate(value)))
  }

  handleInputChange ({ target: { value } }) {
    this.handleChange(value)
  }

  validate (value, nextForm) {
    let isValid = this.props.validate(value, nextForm || this.props.form)
    this.inputElement.setCustomValidity(isValid ? '' : 'Error')
    return isValid
  }

  renderAutocomplete (inputProps) {
    let { value, autocomplete } = this.props
    return (
      <Autocomplete
        ref={el => { this.inputElement = el }}
        items={autocomplete}
        onChange={this.handleInputChange}
        onSelect={this.handleChange}
        getItemValue={item => item}
        inputProps={inputProps}
        value={value}
        shouldItemRender={autocompleteFilter}
        sortItems={autocompleteSort}
        renderItem={(item, isHighlighted) =>
          <li
            className={classnames('mdc-list-item', 'Input__autocomplete-item', {
              'Input__autocomplete-item--active': isHighlighted
            })}
            key={item}>
            {item}
          </li>
        }
        renderMenu={items =>
          <ul className='mdc-list mdc-simple-menu mdc-simple-menu--open mdc-simple-menu__items'>
            {items}
          </ul>
        }
      />
    )
  }

  render () {
    let {
      type,
      helpText,
      errorText,
      model,
      label,
      value,
      invalid,
      required,
      form,
      autocomplete
    } = this.props

    let inputId = model
    let helperId = `${model}-validation-message`
    let helpTextClassname = classnames(
      'mdc-textfield-helptext',
      'mdc-textfield-helptext--validation-msg', {
        'mdc-textfield-helptext--persistent': helpText
      }
    )

    let textfieldClassname = classnames(
      'mdc-textfield',
      'mdc-textfield--upgraded', {
        'mdc-textfield--invalid': invalid && (form.submitted || (this._dirty && this._blurred))
      }
    )

    let inputProps = {
      onBlur: () => { this._blurred = true; this._dirty = true },
      type: type,
      className: 'mdc-textfield__input',
      id: inputId,
      'aria-controls': helperId,
      required: required
    }

    return (
      <div className='Input'>
        <div className={textfieldClassname} ref={el => { this.element = el }}>
          {!autocomplete &&
            <input
              value={value}
              ref={el => { this.inputElement = el }}
              onChange={this.handleInputChange}
              {...inputProps}
            />
          }
          {autocomplete &&
            this.renderAutocomplete(inputProps)
          }
          <label
            htmlFor={inputId}
            className='mdc-textfield__label'>
            {label}
          </label>
        </div>
        <p className={helpTextClassname} id={helperId}>
          {helpText || errorText}
        </p>
      </div>
    )
  }
}

Input.defaultProps = {
  validate: () => true
}

const mapStateToProps = (state, ownProps) => ({
  value: _.get(`forms.${ownProps.model}.value`, state) || '',
  invalid: _.get(`forms.${ownProps.model}.invalid`, state),
  form: _.get(`forms.${ownProps.model.split('.')[0]}`, state)
})

export default connect(mapStateToProps)(Input)
