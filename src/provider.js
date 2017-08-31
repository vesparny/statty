import { Component } from 'react'
import PropTypes from 'prop-types'
import brcast from 'brcast'
import { CHANNEL } from './constants'

class Provider extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = brcast(this.props.state)
  }

  getChildContext () {
    return {
      [CHANNEL]: this.broadcast
    }
  }

  render () {
    const c = this.props.children
    return Array.isArray(c) ? c[0] : c
  }
}

Provider.childContextTypes = {
  [CHANNEL]: PropTypes.object
}

export default Provider
