import { Component } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from 'is-shallow-equal'

const isObjectNotNull = (a, b) => {
  return (
    typeof a === 'object' &&
    typeof b === 'object' &&
    typeof b &&
    a !== null &&
    b !== null
  )
}
class State extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = context.__statty__.broadcast
    this.inspect = context.__statty__.inspect
    this.gs = this.broadcast.getState
    this.prevState = this.gs()
    this.state = props.state ? props.state : this.gs()
    this.update = this.update.bind(this)
    this.setStateIfNeeded = this.setStateIfNeeded.bind(this)
    this.isUpdating = false
  }

  update (updaterFn) {
    if (this.props.state) {
      this.setState(updaterFn)
    } else {
      if (this.isUpdating) {
        throw new Error('Updaters may not invoke update function.')
      }
      this.isUpdating = true
      const oldState = this.gs()
      const nextState = updaterFn(oldState)
      this.inspect && this.inspect(oldState, nextState, updaterFn)
      this.broadcast.setState(nextState)
      this.isUpdating = false
    }
  }

  setStateIfNeeded (nextState) {
    const oldSelectdedState = this.props.select(this.prevState)
    const newSelectedState = this.props.select(nextState)
    if (
      !isObjectNotNull(oldSelectdedState, newSelectedState) ||
      !shallowEqual(oldSelectdedState, newSelectedState)
    ) {
      this.prevState = this.gs()
      this.setState(nextState)
    }
  }

  componentDidMount () {
    if (!this.props.state) {
      this.subscriptionId = this.broadcast.subscribe(this.setStateIfNeeded)
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
  state: PropTypes.object,
  render: PropTypes.func,
  select: PropTypes.func
}

export default State
