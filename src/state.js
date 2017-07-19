import React from 'react'
import PropTypes from 'prop-types'
import { CHANNEL } from './constants'

function childrenToArray (children) {
  return Array.isArray && Array.isArray(children)
    ? children
    : [].concat(children)
}

class State extends React.Component {
  static defaultProps = {
    select: state => state
  }

  static contextTypes = {
    [CHANNEL]: PropTypes.object.isRequired
  }

  static propTypes = {
    update: PropTypes.func,
    state: PropTypes.object
  }

  broadcast = this.context[CHANNEL]

  state = this.props.state ? this.props.state : this.broadcast.getState()

  update = fn =>
    this.props.state
      ? this.setState(fn)
      : this.broadcast.setState(
          Object.assign(
            this.broadcast.getState(),
            fn(this.broadcast.getState())
          )
        )

  componentDidMount () {
    if (!this.props.state) {
      this.unsubscribe = this.broadcast.subscribe(this.setState.bind(this))
    }
  }

  componentWillUnmount () {
    this.unsubscribe && this.unsubscribe()
  }

  render () {
    if (!this.props.children) {
      return null
    }

    const children = childrenToArray(this.props.children)
    const mapped = this.props.select(
      this.props.state ? this.state : this.broadcast.getState()
    )
    return children[0]({ ...mapped }, this.update)
  }
}

export default State
