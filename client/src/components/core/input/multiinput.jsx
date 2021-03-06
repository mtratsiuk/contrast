import React from 'react'
import { connect } from 'react-redux'

import Input from 'components/core/input'
import { addMultiInputField, removeMultiInputField, setInput } from 'actions/forms'

class MultiInput extends React.Component {
  componentDidMount () {
    this.addInitialField(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.inputs, this.props.inputs)) {
      this.props.setInput(
        this.props.model,
        _.map(i => i.value, nextProps.inputs),
        _.some(i => i.invalid, nextProps.inputs)
      )
    }

    this.addInitialField(nextProps)
  }

  addInitialField (props) {
    if (!props.inputModels || !props.inputModels.length) {
      let initialValues = props.getInitialValue && props.getInitialValue()
      if (!_.isEmpty(initialValues)) {
        return initialValues
          .forEach(() => this.props.addMultiInputField(props.model))
      }
      this.props.addMultiInputField(props.model)
    }
  }

  render () {
    let { inputModels, inputs, getInitialValue, ...inputProps } = this.props
    let initialValues = getInitialValue && getInitialValue()

    return (
      <div className='MultiInput'>
        {_.mapi((model, index) =>
          <Input
            {...inputProps}
            key={model}
            model={model}
            getInitialValue={initialValues && (() => initialValues[index])}
            snippet={inputModels.length > 1 &&
              <i onClick={() => this.props.removeMultiInputField(this.props.model, model)}
                className='MultiInput__remove-snippet material-icons'>
                clear
              </i>
            }
          />, inputModels)
        }
        {!!_.get('value.length', _.last(inputs)) &&
          <i
            onClick={() => this.props.addMultiInputField(this.props.model)}
            className='MultiInput__icon material-icons'>
            add_circle_outline
          </i>
        }
      </div>
    )
  }
}

const inputsSelector = _.memoize((form, models) => _.pipe(
  _.map(model => form[model.split('.')[1]]),
  _.filter(i => !!i)
)(models))

export default connect(
  (state, { model }) => {
    let inputModels = _.get(`forms.${model}.fields`, state)
    let form = _.get(`forms.${model.split('.')[0]}`, state)
    let inputs = inputsSelector(form, inputModels)

    return {
      inputModels,
      inputs
    }
  },
  { addMultiInputField, removeMultiInputField, setInput }
)(MultiInput)
