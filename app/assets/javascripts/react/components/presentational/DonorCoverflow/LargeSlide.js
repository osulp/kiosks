import React, { Component, PropTypes } from "react"
import Masonry from "masonry-layout"

class LargeSlide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideAnimationClass: "slide-entering",
      imageCount: 0,
      imagesLoaded: -1
    }
  }

  componentDidMount() {
    this.setExitingTimeout()
    this.setHideTimeout()
    this.setState({
      imageCount: this.props.slide.collection.slides.length,
      imagesLoaded: 0
    })
  }

  handleImageLoaded() {
    this.setState({ imagesLoaded: this.state.imagesLoaded + 1 })
    if (this.state.imagesLoaded + 1 >= this.state.imageCount) {
      let msnry = new Masonry(".grid", {
        itemSelector: ".grid-item",
        gutter: 10
      })
    }
  }

  setExitingTimeout() {
    const exiting = () => {
      this.setState({ slideAnimationClass: "slide-exiting" })
    }
    this.exiting_timeout = setTimeout(exiting, 124650)
  }

  setHideTimeout() {
    const hide = () => {
      this.props.setModalVisibility(false)
      this.props.setModalRootComponent(undefined)
    }
    this.hide_timeout = setTimeout(hide, 125000)
  }

  componentWillUnmount() {
    clearTimeout(this.hide_timeout)
    clearTimeout(this.exiting_timeout)
  }

  render() {
    let slide = this.props.slide
    return (
      <div
        className={this.state.slideAnimationClass}
        style={{ backgroundColor: "#000", height: "90%" }}
      >
        <div
          className="col-md-4"
          style={{
            height: "100%",
            backgroundColor: "#eee",
            borderRadius: "10px",
            padding: "2px"
          }}
        >
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "1.25rem",
              border: "none",
              backgroundColor: "transparent"
            }}
          >
            {slide.collection.detail}
          </pre>
        </div>
        <div className="col-md-8">
          <div className="grid">
            {slide.collection.slides.map((slide, i) => {
              return (
                <div
                  className="grid-item"
                  key={`slide.${i}`}
                  style={{
                    width: "300px",
                    marginBottom: "10px"
                  }}
                >
                  <img
                    src={slide.original}
                    style={{
                      width: "100%"
                    }}
                    onLoad={this.handleImageLoaded.bind(this)}
                  />
                </div>
              )
            })}
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
