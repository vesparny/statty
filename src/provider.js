import React from 'react'
import PropTypes from 'prop-types'
import brcast from 'brcast'
import { CHANNEL } from './constants'

class Provider extends React.Component {
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

Provider.childContextTypes = {
  [CHANNEL]: PropTypes.object
}

export default Provider
