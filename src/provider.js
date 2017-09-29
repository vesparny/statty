import { Component } from 'react'
import PropTypes from 'prop-types'
import brcast from 'brcast'

class Provider extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = brcast(props.state)
  }

  getChildContext () {
    return {
      __statty__: {
        broadcast: this.broadcast,
        inspect: this.props.inspect
      }
    }
  }

  render () {
    const children = this.props.children
    return Array.isArray(children) ? children[0] : children
  }
}

Provider.childContextTypes = {
  __statty__: PropTypes.object
}

Provider.propTypes = {
  inspect: PropTypes.func,
  state: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default Provider
