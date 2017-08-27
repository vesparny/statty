import { Component } from 'react'
import PropTypes from 'prop-types'
import { CHANNEL } from './constants'

class State extends Component {
  static defaultProps = {
    select: state => state
  }

  static contextTypes = {
    [CHANNEL]: PropTypes.object.isRequired
  }

  static propTypes = {
    update: PropTypes.func,
    state: PropTypes.object,
    render: PropTypes.func
  }

  broadcast = this.context[CHANNEL]

  state = this.props.state ? this.props.state : this.broadcast.getState()

  update = fn => {
    if (this.props.state) {
      this.setState(fn)
    } else {
      const oldState = this.broadcast.getState()
      this.broadcast.setState(Object.assign({}, oldState, fn(oldState)))
    }
  }

  componentDidMount () {
    if (!this.props.state) { this.subscriptionId = this.broadcast.subscribe(this.setState.bind(this)) }
  }

  componentWillUnmount () {
    this.subscriptionId && this.broadcast.unsubscribe(this.subscriptionId)
  }

  render () {
    if (!this.props.render) return null

    const mapped = this.props.select(
      this.props.state ? this.state : this.broadcast.getState()
    )
    return this.props.render({ ...mapped }, this.update) || null
  }
}

export default State
