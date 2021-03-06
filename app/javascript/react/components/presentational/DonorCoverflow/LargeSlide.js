import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Masonry from "masonry-layout"

const LargeSlide = props => {
  const [slideAnimationClass, setSlideAnimationClass] = useState(
    "slide-entering"
  )
  const [imageCount, setImageCount] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(-1)
  const [slideZoomedIndex, setSlideZoomedIndex] = useState(-1)
  const [exitingTimeout, setExitingTimeout] = useState(undefined)
  const [hideTimeout, setHideTimeout] = useState(undefined)
  const [zoomTimeout, setZoomTimeout] = useState(undefined)

  useEffect(() => {
    const exiting_timeout = setTimeout(() => {
      props.rotateActiveSlides()
      setSlideAnimationClass("slide-exiting")
    }, 179650)
    setExitingTimeout(exiting_timeout)
    const hide_timeout = setTimeout(() => {
      props.setModalVisibility(false)
      props.setModalRootComponent(undefined)
    }, 180000)
    setHideTimeout(hide_timeout)
    setImageCount(props.slide.collection.slides.length)
    setImagesLoaded(0)
    return () => {
      clearTimeout(hide_timeout)
      clearTimeout(exiting_timeout)
      clearTimeout(zoomTimeout)
    }
  }, [])

  const handleImageLoaded = () => {
    setImagesLoaded(imagesLoaded + 1)
    if (imagesLoaded + 1 >= imageCount) {
      new Masonry(".grid", {
        itemSelector: ".grid-item",
        gutter: 30
      })
    }
  }

  const backClicked = () => {
    props.setModalVisibility(false)
    props.setModalRootComponent(undefined)
    props.rotateActiveSlides()
  }

  const slideClicked = i => {
    let close_zoom_timeout = 30000
    if (slideZoomedIndex === i) {
      clearTimeout(zoomTimeout)
      close_zoom_timeout = 150
    }
    setSlideZoomedIndex(i)
    const zoom_timeout = setTimeout(
      () => setSlideZoomedIndex(-1),
      close_zoom_timeout
    )
    setZoomTimeout(zoom_timeout)
  }

  // htmlDecode gets the html that comes encoded from the server and returns
  // content that can be safely rendered in a component.
  // Example input: "hello&lt;br&gt;world""
  // Example return: htmlDecode(input) = "hello<br>world"
  const htmlDecode = input => {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent
  }

  return (
    <div
      className={slideAnimationClass}
      onClick={() => {
        if (slideZoomedIndex !== -1) {
          setSlideZoomedIndex(-1)
        }
      }}
    >
      <div
        className="col-md-7"
        style={{
          height: "100%",
          backgroundColor: "#006A8E",
          color: "#eee",
          padding: "20px"
        }}
      >
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: htmlDecode(props.slide.collection.detail) }}
        />
        <span className="back-button" onClick={backClicked}>
          BACK
        </span>
      </div>
      <div className="col-md-5" style={{ padding: "8% 3%" }}>
        <div className="grid">
          {props.slide.collection.slides.map((s, i) => {
            return (
              <div
                className={
                  "grid-item " + (i === slideZoomedIndex ? "zoomed" : "not-zoomed")
                }
                key={`slide.${i}`}
                onClick={_e => slideClicked(i)}
                style={{
                  width: "300px",
                  marginBottom: "30px"
                }}
              >
                <img
                  src={s.large}
                  style={{
                    width: "100%"
                  }}
                  onLoad={handleImageLoaded}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

LargeSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  rotateActiveSlides: PropTypes.func.isRequired
}

export default LargeSlide
