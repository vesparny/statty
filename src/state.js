import React from 'react'
import PropTypes from 'prop-types'
import { CHANNEL } from './constants'

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

  update = fn => {
    if (this.props.state) {
      this.setState(fn)
    } else {
      const oldState = this.broadcast.getState()
      this.broadcast.setState(Object.assign({}, oldState, fn(oldState)))
    }
  }

  componentDidMount () {
    if (!this.props.state) {
      this.unsubscribe = this.broadcast.subscribe(this.setState.bind(this))
    }
  }

  componentWillUnmount () {
    this.unsubscribe && this.unsubscribe()
  }

  render () {
    const { children } = this.props
    if (!children) {
      return null
    }

    const c = Array.isArray(children) ? children : [].concat(children)
    const mapped = this.props.select(
      this.props.state ? this.state : this.broadcast.getState()
    )
    return c[0]({ ...mapped }, this.update)
  }
}

export default State
