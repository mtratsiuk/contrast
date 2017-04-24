import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Typography = ({ type, children, className }) => {
  return React.cloneElement(children, {
    className: classnames(className, `mdc-typography--${type}`)
  })
}

Typography.propTypes = {
  type: PropTypes.oneOf([
    'display4',
    'display3',
    'display2',
    'display1',
    'headline',
    'title',
    'subheading2',
    'subheading1',
    'body2',
    'body1'
  ]).isRequired
}

export default Typography
