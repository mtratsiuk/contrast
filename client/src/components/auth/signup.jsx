import React from 'react'
import { connect } from 'react-redux'

import Auth from 'components/auth'
import Form from 'components/core/form'
import Input from 'components/core/input'

const Signup = ({
  form
}) =>
  <Auth>
    <Form model='signup'>
      <h1 className='mdc-typography--display1'>Sign up</h1>
      <Input
        model='signup.name'
        type='text'
        label='Name'
        validate={value => /^.*\w.*$/.test(value)}
        required
        errorText='Name must contain at least one word character'
      />
      <Input
        model='signup.password'
        type='password'
        label='Password'
        required
      />
      <Input
        model='signup.repeatPassword'
        type='password'
        label='Confirm password'
        validate={(value, form) => _.get('password.value', form) === value}
        errorText='Passwords do not match'
        required
      />
    </Form>
  </Auth>

export default connect(state => ({
  form: state.forms.signup || {}
}))(Signup)
