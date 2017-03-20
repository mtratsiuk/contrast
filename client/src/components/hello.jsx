import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as helloActions from 'actions/hello'
import Button from 'components/core/button'
import Input from 'components/core/input'

const Hello = ({ world, showHello }) =>
  <div>
    <h1>Hello, {world}</h1>
    <Button
      accent
      raised
      onClick={() => showHello('world!')}>
      world
    </Button>

    <Input
      model='hello.username'
      type='text'
      label='User name'
      validation={{
        pattern: '[a-zA-Z]{3,8}'
      }}
      errorText='User name must contain 3-8 letters'
     />

    <h5>Build version: {__VERSION__}</h5>
  </div>

export default connect(
  state => ({ world: state.hello }),
  dispatch => bindActionCreators(helloActions, dispatch)
)(Hello)
