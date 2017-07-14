import React from 'react'
import PropTypes from 'prop-types'
import brcast from 'brcast'

class Provider extends React.Component {
  broadcast = brcast(this.props.state)

  getChildContext () {
    return {
      broadcast: this.broadcast
    }
  }

  render () {
    return this.props.children
  }
}

Provider.childContextTypes = {
  broadcast: PropTypes.object
}

export default Provider
