import React from 'react'
import PropTypes from 'prop-types'
import brcast from 'brcast'
import { CHANNEL } from './constants'

class Provider extends React.Component {
  static childContextTypes = {
    [CHANNEL]: PropTypes.object
  }

  broadcast = brcast(this.props.state)

  getChildContext () {
    return {
      [CHANNEL]: this.broadcast
    }
  }

  render () {
    return this.props.children
  }
}

export default Provider
