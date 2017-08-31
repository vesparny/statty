import { Component } from 'react'
import PropTypes from 'prop-types'
import xtend from 'xtend'
import { CHANNEL } from './constants'

class Connector extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = context[CHANNEL]
    this.gs = this.broadcast.getState
    this.state = props.state ? props.state : this.gs()
    this.update = this.update.bind(this)
  }

  update (fn) {
    this.props.state
      ? this.setState(fn)
      : this.broadcast.setState(xtend(this.gs(), fn(this.gs())))
  }

  componentDidMount () {
    if (!this.props.state) { this.subscriptionId = this.broadcast.subscribe(this.setState.bind(this)) }
  }

  componentWillUnmount () {
    this.subscriptionId && this.broadcast.unsubscribe(this.subscriptionId)
  }

  render () {
    const render = this.props.render
    if (!render) return null

    const mapped = this.props.select(this.props.state ? this.state : this.gs())
    return render(mapped, this.update) || null
  }
}

Connector.defaultProps = {
  select: s => s
}

Connector.contextTypes = {
  [CHANNEL]: PropTypes.object.isRequired
}

Connector.propTypes = {
  update: PropTypes.func,
  state: PropTypes.object,
  render: PropTypes.func
}

export default Connector
