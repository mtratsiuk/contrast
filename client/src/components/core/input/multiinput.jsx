import React from 'react'
import { connect } from 'react-redux'

import Input from 'components/core/input'
import { addMultiInputField, setInput } from 'actions/forms'

class MultiInput extends React.Component {
  componentDidMount () {
    this.props.dispatch(addMultiInputField(this.props.model))
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.inputs, this.props.inputs)) {
      this.props.dispatch(setInput(
        this.props.model,
        _.map(i => i.value, nextProps.inputs),
        _.some(i => i.invalid, nextProps.inputs)
      ))
    }
  }

  render () {
    let { inputModels, ...inputProps } = this.props

    return (
      <div className='MultiInput'>
        {_.map(model =>
          <Input
            {...inputProps}
            key={model}
            model={model}
          />, inputModels)
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
  }
)(MultiInput)
