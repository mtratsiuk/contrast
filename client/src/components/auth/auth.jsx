import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { setFormSubmitted } from 'actions/forms'
import * as userActions from 'actions/user'

import Form from 'components/core/form'
import Input from 'components/core/input'
import Button from 'components/core/button'
import Typography from 'components/core/typography'

const Auth = ({
  form,
  dispatch,
  type,
  title
}) => {
  let otherType = type === 'login' ? 'signup' : 'login'
  let otherTitle = type === 'login' ? 'Sign Up' : 'Log In'

  return (
    <div className='Auth'>
      <div className='Auth__form'>
        <Form model={`${type}`}>
          <Typography type='display1'>
            <h1>{title}</h1>
          </Typography>
          <Input
            model={`${type}.name`}
            type='text'
            label='Name'
            validate={value => /^.*\w.*$/.test(value)}
            required
            errorText='Name must contain at least one word character'
          />
          <Input
            model={`${type}.password`}
            type='password'
            label='Password'
            validate={value => !!value.length}
            errorText='Password required'
            required
          />
          {type === 'signup' &&
            <Input
              model={`${type}.repeatPassword`}
              type='password'
              label='Confirm password'
              validate={(value, form) => _.get('password.value', form) === value}
              errorText='Passwords do not match'
              required
            />
          }
          <Button
            className='Auth__submit-btn'
            primary
            onClick={() => {
              if (form.invalid) return dispatch(setFormSubmitted(type, true))
              let { name, password } = form
              dispatch(userActions[type](name.value, password.value))
            }}>
            {title}
          </Button>
        </Form>
        <Button
          className='Auth__other-btn'
          raised={false}
          primary
          dense
          onClick={() => dispatch(push(`/${otherType}`))}>
          {otherTitle}
        </Button>
      </div>
    </div>
  )
}

export default connect((state, ownProps) => ({
  form: state.forms[ownProps.type] || {}
}))(Auth)
