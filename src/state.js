import React from 'react'
import PropTypes from 'prop-types'
import { CHANNEL } from './constants'

function childrenToArray (children) {
  return Array.isArray && Array.isArray(children)
    ? children
    : [].concat(children)
}

class State extends React.Component {
  state = this.props.state ? this.props.state : this.context[CHANNEL].getState()

  update = fn => {
    if (this.props.state) {
      this.setState(fn)
    } else {
      const oldState = this.context[CHANNEL].getState()
      this.context[CHANNEL].setState(Object.assign(oldState, fn(oldState)))
    }
  }

  notify = state => this.setState(state)

  componentDidMount () {
    if (!this.props.state) {
      this.unsubscribe = this.context[CHANNEL].subscribe(this.notify)
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
      this.props.state ? this.state : this.context[CHANNEL].getState()
    )
    return children[0]({ ...mapped }, this.update)
  }
}

State.defaultProps = {
  select: state => state
}

State.contextTypes = {
  [CHANNEL]: PropTypes.object.isRequired
}

State.propTypes = {
  update: PropTypes.func,
  state: PropTypes.object
}

export default State
