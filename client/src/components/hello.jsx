import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as helloActions from 'actions/hello'
import Button from 'components/core/button'
import Input from 'components/core/input'
import Select from 'components/core/select'

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

    <Input
      model='hello.autocomplete'
      type='text'
      label='User name autocomplete'
      validate={value => /^[a-z]{3,8}$/i.test(value)}
      errorText='User name must contain 3-8 letters'
      autocomplete={['copper', 'explain', 'ill-fated', 'truck', 'neat', 'unite', 'branch', 'educated', 'tenuous', 'hum', 'decisive', 'notice']}
    />

    <Select
      model='hello.select'
      options={[
        { title: 'First option', data: { v: 1 } },
        { title: 'Second option', data: 'text' },
        { title: 'Third option', data: { v: 3 } }
      ]}
    />

    <h5>Build version: {__VERSION__}</h5>
  </div>

export default connect(
  state => ({ world: state.hello }),
  dispatch => bindActionCreators(helloActions, dispatch)
)(Hello)
