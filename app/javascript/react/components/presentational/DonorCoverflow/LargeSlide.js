import React, { Component } from "react"
import PropTypes from "prop-types"
import Masonry from "masonry-layout"

class LargeSlide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideAnimationClass: "slide-entering",
      imageCount: 0,
      imagesLoaded: -1,
      slideZoomedIndex: -1
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
        gutter: 30
      })
    }
  }

  setExitingTimeout() {
    const exiting = () => {
      this.props.rotateActiveSlides()
      this.setState({ slideAnimationClass: "slide-exiting" })
    }
    this.exiting_timeout = setTimeout(exiting, 179650)
  }

  setHideTimeout() {
    const hide = () => {
      this.props.setModalVisibility(false)
      this.props.setModalRootComponent(undefined)
    }
    this.hide_timeout = setTimeout(hide, 180000)
  }

  backClicked() {
    this.props.setModalVisibility(false)
    this.props.setModalRootComponent(undefined)
    this.props.rotateActiveSlides()
  }

  slideClicked(i) {
    let close_zoom_timeout = 5000
    if (this.state.slideZoomedIndex === i) {
      clearTimeout(this.zoom_timeout)
      close_zoom_timeout = 150
    }
    this.setState({
      slideZoomedIndex: i
    })
    this.zoom_timeout = setTimeout(
      () => this.setState({ slideZoomedIndex: -1 }),
      close_zoom_timeout
    )
  }

  componentWillUnmount() {
    clearTimeout(this.hide_timeout)
    clearTimeout(this.exiting_timeout)
    clearTimeout(this.zoom_timeout)
  }

  render() {
    let slide = this.props.slide
    return (
      <div className={this.state.slideAnimationClass}>
        <div
          className="col-md-5"
          style={{
            height: "100%",
            backgroundColor: "#0d5257",
            color: "#eee",
            padding: "20px"
          }}
        >
          <div
            className="html-content"
            dangerouslySetInnerHTML={{ __html: slide.collection.detail }}
          />
          <span className="back-button" onClick={this.backClicked.bind(this)}>
            BACK
          </span>
        </div>
        <div className="col-md-7" style={{ padding: "8% 3%" }}>
          <div className="grid">
            {slide.collection.slides.map((slide, i) => {
              return (
                <div
                  className={
                    "grid-item " +
                    (i === this.state.slideZoomedIndex ? "zoomed" : "")
                  }
                  key={`slide.${i}`}
                  onClick={this.slideClicked.bind(this, i)}
                  style={{
                    width: "300px",
                    marginBottom: "30px"
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
  setModalRootComponent: PropTypes.func.isRequired,
  rotateActiveSlides: PropTypes.func.isRequired
}

export default LargeSlide
