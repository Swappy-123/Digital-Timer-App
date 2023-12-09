// Write your code here

import {Component} from 'react'

import './index.css'

const initialState = {isTimer: false, isSeconds: 0, isMinutes: 25}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearInterval()
  }

  clearInterval = () => clearInterval(this.intervalId)

  getTimeFormat = () => {
    const {isMinutes, isSeconds} = this.state
    const remainSeconds = isMinutes * 60 - isSeconds
    const minutes = Math.floor(remainSeconds / 60)
    const seconds = Math.floor(remainSeconds % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0 ${minutes}`
    const stringifiedSec = minutes > 9 ? seconds : `0 ${seconds}`
    return `${stringifiedMin} : ${stringifiedSec} `
  }

  setTimer = () => {
    const {isMinutes, isSeconds} = this.state
    const isTimerCompleted = isSeconds === isMinutes * 60

    if (isTimerCompleted) {
      this.clearInterval()
      this.setState({isTimer: false})
    } else {
      this.setState(prevState => ({
        isSeconds: prevState.isSeconds + 1,
      }))
    }
  }

  clickTimer = () => {
    const {isMinutes, isSeconds, isTimer} = this.state
    const isTimerCompleted = isSeconds === isMinutes * 60

    if (isTimerCompleted) {
      this.setState({isSeconds: 0})
    }
    if (isTimer) {
      this.clearInterval()
    } else {
      this.intervalId = setInterval(this.setTimer, 1000)
    }
    this.setState(prevState => ({isTimer: !prevState.isTimer}))
  }

  resetTimer = () => {
    this.clearInterval()
    this.setState(initialState)
  }

  getTimer = () => {
    const {isTimer} = this.state
    const imgUrl = isTimer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
    const altIcon = isTimer ? 'pause icon' : 'play icon'

    return (
      <div className="bg-button">
        <button type="button" className="button" onClick={this.clickTimer}>
          <img alt={altIcon} className="icon-img" src={imgUrl} />
          <p className="btn-para">{isTimer ? 'Pause' : 'Start'}</p>
        </button>

        <button type="button" onClick={this.resetTimer} className="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="icon-img"
            alt="reset icon"
          />
          <p className="btn-para">Reset</p>
        </button>
      </div>
    )
  }

  onDecrement = () => {
    const {isMinutes} = this.state

    if (isMinutes > 1) {
      this.setState(prevState => ({
        isMinutes: prevState.isMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      isMinutes: prevState.isMinutes + 1,
    }))
  }

  getTimerChange = () => {
    const {isMinutes, isSeconds} = this.state
    const isButton = isSeconds > 0
    return (
      <div className="bg-change">
        <p className="change-para">Set Timer limit</p>
        <div className="change-btn">
          <button
            type="button"
            className="changeBtn"
            disabled={isButton}
            onClick={this.onDecrement}
          >
            -
          </button>
          <p className="button-para">{isMinutes}</p>
          <button
            type="button"
            className="changeBtn"
            disabled={isButton}
            onClick={this.onIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimer} = this.state
    const onChange = isTimer ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="bottom">
          <div className="first">
            <div className="bg-image">
              <h1 className="time">{this.getTimeFormat()}</h1>
              <p className="para">{onChange}</p>
            </div>
          </div>
          <div className="second">
            {this.getTimer()}
            {this.getTimerChange()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
