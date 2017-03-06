import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as helloActions from 'actions/hello'

const Hello = ({ world, showHello }) =>
  <div>
    <h1>Hello, {world}</h1>
    <button onClick={() => showHello('world!')}>world</button>
    <h5>Build version: {__VERSION__}</h5>
  </div>

export default connect(
  state => ({ world: state.hello }),
  dispatch => bindActionCreators(helloActions, dispatch)
)(Hello)
