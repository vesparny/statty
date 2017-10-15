import { Component } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from 'is-shallow-equal'

const isObjectNotNull = (a, b) => {
  return (
    typeof a === 'object' && typeof b === 'object' && a !== null && b !== null
  )
}

class State extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = context.__statty__.broadcast
    this.inspect = context.__statty__.inspect
    this.prevState = this.broadcast.getState()
    this.state = props.state ? props.state : this.broadcast.getState()
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
      const oldState = this.broadcast.getState()
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
      this.prevState = this.broadcast.getState()
      this.setState(nextState)
    }
  }

  componentDidMount () {
    if (!this.props.state) {
      this.subscriptionId = this.broadcast.subscribe(this.setStateIfNeeded)
      // To handle the case where a child component may have triggered a state change in
      // its cWM/cDM, we have to re-run the selector and maybe  re-render.
      this.setStateIfNeeded(this.broadcast.getState())
    }
  }

  componentWillUnmount () {
    this.subscriptionId && this.broadcast.unsubscribe(this.subscriptionId)
  }

  render () {
    return (
      this.props.render(
        this.props.select(
          this.props.state ? this.state : this.broadcast.getState()
        ),
        this.update
      ) || null
    )
  }
}

State.defaultProps = {
  select: s => s,
  render: () => null
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
