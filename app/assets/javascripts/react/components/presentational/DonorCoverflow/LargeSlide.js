import React, { Component, PropTypes } from "react"

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
    this.exiting_timeout = setTimeout(exiting, 24650)
  }

  setHideTimeout() {
    const hide = () => {
      this.props.setModalVisibility(false)
      this.props.setModalRootComponent(undefined)
    }
    this.hide_timeout = setTimeout(hide, 25000)
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
        <div className="col-md-5">{slide.collection.detail}</div>
        <ul className="col-md-7">
          {slide.collection.slides.map((slide, i) => {
            return (
              <li key={`slide.${i}`}>
                <img
                  src={slide.original}
                  style={{
                    display: "block"
                  }}
                />
              </li>
            )
          })}
        </ul>
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
