import { Component } from 'react'
import PropTypes from 'prop-types'
import xtend from 'xtend'

class Connector extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = context.__statty__
    this.gs = this.broadcast.getState
    this.state = props.state ? props.state : this.gs()
    this.update = this.update.bind(this)
    this.setState = this.setState.bind(this)
  }

  debug (oldState, newState) {
    try {
      console.group('%c action%c name', 'color: #AAAAAA', 'color: #001B44')
    } catch (e) {
      console.log('action')
    }
    console.log('%c old state', 'color: #FF725C', oldState)
    console.log('%c action', 'color: #111111')
    console.log('%c new state', 'color: #137752', newState)
    try {
      console.groupEnd()
    } catch (e) {
      console.log('== end ==')
    }
  }

  update (fn) {
    if (this.props.state) {
      this.setState(fn)
    } else {
      const oldState = this.gs()
      const newState = xtend(oldState, fn(oldState))
      this.props.debug && this.debug(oldState, newState)
      this.broadcast.setState(newState)
    }
  }

  componentDidMount () {
    if (!this.props.state) {
      this.subscriptionId = this.broadcast.subscribe(this.setState)
    }
  }

  componentWillUnmount () {
    this.subscriptionId && this.broadcast.unsubscribe(this.subscriptionId)
  }

  render () {
    if (!this.props.render) return null
    const mapped = this.props.select(this.props.state ? this.state : this.gs())
    return this.props.render(mapped, this.update) || null
  }
}

Connector.defaultProps = {
  select: s => s
}

Connector.contextTypes = {
  __statty__: PropTypes.object.isRequired
}

Connector.propTypes = {
  update: PropTypes.func,
  state: PropTypes.object,
  render: PropTypes.func
}

export default Connector
