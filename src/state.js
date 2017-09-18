import { Component } from 'react'
import PropTypes from 'prop-types'
import xtend from 'xtend'

class State extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = context.__statty__.broadcast
    this.inspect = context.__statty__.inspect
    this.gs = this.broadcast.getState
    this.state = props.state ? props.state : this.gs()
    this.update = this.update.bind(this)
    this.setState = this.setState.bind(this)
  }

  update (updaterFn) {
    if (this.props.state) {
      this.setState(updaterFn)
    } else {
      const oldState = this.gs()
      const newState = xtend(oldState, updaterFn(oldState))
      this.inspect && this.inspect(oldState, newState, updaterFn)
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
    const props = this.props
    if (!props.render) return null
    return (
      props.render(
        props.select(props.state ? this.state : this.gs()),
        this.update
      ) || null
    )
  }
}

State.defaultProps = {
  select: s => s
}

State.contextTypes = {
  __statty__: PropTypes.object.isRequired
}

State.propTypes = {
  update: PropTypes.func,
  state: PropTypes.object,
  render: PropTypes.func
}

export default State
