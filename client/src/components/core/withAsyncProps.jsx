import React from 'react'

export const withAsyncProps = asyncProps => Component => class WithAsyncProps extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      props: null
    }

    this.awaitProps()
  }

  async awaitProps () {
    let props = await Object.keys(asyncProps).reduce(async (result, current) => {
      result[current] = await asyncProps[current]
      return result
    }, {})

    this.setState({ props })
  }

  render () {
    let { props } = this.state

    if (!props) return null

    return <Component {...this.props} {...props} />
  }
}

export default withAsyncProps
