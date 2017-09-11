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
  }

  update (fn) {
    if (this.props.state) {
      this.setState(fn)
    } else {
      const oldState = this.gs()
      this.broadcast.setState(xtend(oldState, fn(oldState)))
    }
  }

  componentDidMount () {
    if (!this.props.state) {
      this.subscriptionId = this.broadcast.subscribe(this.setState.bind(this))
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
