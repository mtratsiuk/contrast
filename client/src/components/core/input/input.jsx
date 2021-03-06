import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Autocomplete from 'react-autocomplete'
import { MDCTextfield } from '@material/textfield'

import { setInput, setInputValidation } from 'actions/forms'
import { autocompleteFilter, autocompleteSort } from './utils'

class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      autocomplete: this.props.autocomplete ? [] : null,
      isOpen: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.validate = this.validate.bind(this)
    this.receiveAutocomplete = this.receiveAutocomplete.bind(this)
  }

  componentDidMount () {
    let { dispatch, model, value } = this.props
    this._mdcTextfield = new MDCTextfield(this.element)

    dispatch(setInput(model, value, !this.validate(value)))
    this.receiveAutocomplete(this.props.autocomplete)
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

    let isValid = this.validate(nextProps.value, nextProps.form)

    if (this.props.form !== nextProps.form) {
      if (!nextProps.invalid !== isValid) {
        dispatch(setInputValidation(nextProps.model, !isValid))
      }

      if (this.props.form &&
        this.props.form.submitted !== nextProps.form.submitted &&
        !nextProps.form.submitted) {
        this._blurred = false
        this._dirty = false
      }

      if (nextProps.input == null) {
        dispatch(setInput(nextProps.model, nextProps.value, !isValid))
        this._blurred = false
        this._dirty = false
      }
    }

    if (this.props.autocomplete !== nextProps.autocomplete) {
      this.receiveAutocomplete(nextProps.autocomplete)
    }
  }

  receiveAutocomplete (autocomplete) {
    if (autocomplete && autocomplete.then) {
      return autocomplete.then(data => this.setState({
        autocomplete: data
      }))
    }
    this.setState({ autocomplete })
  }

  handleChange (value) {
    let { dispatch, model } = this.props
    this._dirty = true
    dispatch(setInput(model, value, !this.validate(value)))
  }

  handleInputChange ({ target: { value } }) {
    this.handleChange(value)
  }

  handleSelect (selectedValue) {
    let { value, autocompleteModifyOnSelect } = this.props
    this.inputElement.focus()
    if (!autocompleteModifyOnSelect) return this.handleChange(selectedValue)
    this.handleChange(autocompleteModifyOnSelect(value, selectedValue))
  }

  validate (value, nextForm) {
    let isValid = !!this.props.validate(value, nextForm || this.props.form)
    this.inputElement.setCustomValidity(isValid ? '' : 'Error')
    return isValid
  }

  renderAutocomplete (inputProps) {
    let { value } = this.props
    let { autocomplete } = this.state
    return (
      <Autocomplete
        ref={el => { this.inputElement = el }}
        items={autocomplete}
        onChange={this.handleInputChange}
        onSelect={this.handleSelect}
        getItemValue={item => item}
        inputProps={inputProps}
        value={value}
        shouldItemRender={this.props.autocompleteFilter || autocompleteFilter}
        sortItems={autocompleteSort}
        onMenuVisibilityChange={isOpen => this.setState({ isOpen })}
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
        wrapperStyle={{
          width: '100%'
        }}
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
      className,
      style,
      form,
      snippet
    } = this.props
    let { autocomplete, isOpen } = this.state

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

    let inputClassname = classnames(className, 'Input', {
      'Input--open': isOpen
    })

    let labelClassname = classnames(className, 'mdc-textfield__label', {
      'mdc-textfield__label--required': required,
      'mdc-textfield__label--float-above': value.length
    })

    let inputProps = {
      onBlur: () => { this._blurred = true; this._dirty = true },
      type: type,
      className: 'mdc-textfield__input',
      id: inputId,
      'aria-controls': helperId,
      required: required
    }

    return (
      <div className={inputClassname} style={style}>
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
            className={labelClassname}>
            {label}
          </label>
        </div>
        <p className={helpTextClassname} id={helperId}>
          {helpText || errorText}
        </p>
        {snippet}
      </div>
    )
  }
}

Input.defaultProps = {
  validate: () => true
}

const mapStateToProps = (state, { model, getInitialValue = () => '' }) => {
  let input = _.get(`forms.${model}`, state)

  return {
    input,
    value: (input && input.value != null) ? input.value : getInitialValue() || '',
    invalid: input && input.invalid,
    form: _.get(`forms.${model.split('.')[0]}`, state)
  }
}

export default connect(mapStateToProps)(Input)
