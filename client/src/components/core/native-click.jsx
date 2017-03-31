import React from 'react'
import ReactDOM from 'react-dom'

class NativeClick extends React.PureComponent {
  componentDidMount () {
    this.element = ReactDOM.findDOMNode(this)
    this.element.addEventListener('click', this.props.onClick)
  }

  componentWillUnmount () {
    this.element.removeEventListener('click', this.props.onClick)
  }

  render () {
    return this.props.children
  }
}

export default NativeClick
