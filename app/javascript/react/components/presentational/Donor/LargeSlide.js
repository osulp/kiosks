import React, { Component } from "react"
import PropTypes from "prop-types"

class LargeSlide extends Component {
  constructor(props) {
    super(props)
    this.state = { slideAnimationClass: "slide-entering" }
  }

  componentDidMount() {
    this.setExitingTimeout()
    this.setHideTimeout()
  }

  setExitingTimeout() {
    const exiting = () => {
      this.setState({ slideAnimationClass: "slide-exiting" })
    }
    //This time is exactly based on the animation duration found in _donor_kiosk.scss
    this.exiting_timeout = setTimeout(exiting, 14650)
  }

  setHideTimeout() {
    const hide = () => {
      this.props.setModalVisibility(false)
      this.props.setModalRootComponent(undefined)
    }
    this.hide_timeout = setTimeout(hide, 15000)
  }

  componentWillUnmount() {
    clearTimeout(this.hide_timeout)
    clearTimeout(this.exiting_timeout)
  }

  render() {
    let slide = this.props.slide
    return (
      <div
        className={`container modal-container ${
          this.state.slideAnimationClass
        }`}
      >
        <div className="row donor-large-image-row">
          <div className="col-md-offset-1 col-md-10 modal-image-col">
            <div className="panel panel-default modal-panel">
              <div
                className="panel-body donor-body-large"
                style={{ backgroundImage: `url("${slide.xlarge}")` }}
              />
            </div>
          </div>
        </div>
        <div className="row modal-bottom-row">
          <div className="col-md-12 modal-caption-col">
            <div className="panel panel-default caption-panel">
              <div className="panel-body new-background">
                <div className="caption-container">
                  <div className="text-center h1">{slide.title}</div>
                  <div className="text-center caption-text">
                    <p>{slide.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LargeSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired
}

export default LargeSlide
