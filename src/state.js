import React from 'react'
import PropTypes from 'prop-types'

function childrenToArray (children) {
  return Array.isArray && Array.isArray(children)
    ? children
    : [].concat(children)
}

class State extends React.Component {
  state = this.props.state
    ? this.props.state
    : this.context.broadcast.getState()

  update = fn =>
    this.props.state
      ? this.setState(fn)
      : this.context.broadcast.setState(fn(this.context.broadcast.getState()))

  notify = state => this.setState(state)

  componentDidMount () {
    if (!this.props.state) {
      this.unsubscribe = this.context.broadcast.subscribe(this.notify)
    }
  }

  componentWillMount () {
    this.unsubscribe && this.unsubscribe()
  }

  render () {
    if (!this.props.children) {
      return null
    }

    const children = childrenToArray(this.props.children)
    const mapped = this.props.select(
      this.props.state ? this.state : this.context.broadcast.getState()
    )
    return children[0]({ ...mapped }, this.update)
  }
}

State.defaultProps = {
  select: state => state
}

State.contextTypes = {
  broadcast: PropTypes.object.isRequired
}

State.contextTypes = {
  update: PropTypes.func,
  state: PropTypes.object
}

export default State
