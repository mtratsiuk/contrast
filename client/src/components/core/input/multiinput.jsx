import React from 'react'
import { connect } from 'react-redux'

import Input from 'components/core/input'
import { addMultiInputField, setInput } from 'actions/forms'

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
      this.props.addMultiInputField(props.model)
    }
  }

  render () {
    let { inputModels, inputs, ...inputProps } = this.props

    return (
      <div className='MultiInput'>
        {_.map(model =>
          <Input
            {...inputProps}
            key={model}
            model={model}
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
  { addMultiInputField, setInput }
)(MultiInput)
