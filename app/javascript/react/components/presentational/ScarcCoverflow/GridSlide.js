import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Masonry from "masonry-layout"
import GridMenu from "./GridMenu"

const GridSlide = props => {
  const [slideAnimationClass, setSlideAnimationClass] = useState(
    "slide-entering"
  )
  const [imageCount, setImageCount] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(-1)
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

  const selected_primary_slide_index = props.primary_slides.findIndex(slide => slide.id === props.slide.collection.primary_slide.id)

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
    // TODO: handler for selected slide (detail)
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
        // TODO: handler for detail view
      }}
    >

      <div className="col-md-12" style={{ height: "950px", padding: "3% 3%" }}>
        <div className="grid">
          {props.slide.collection.slides.map((s, i) => {
            return (
              <div
                className={
                  "grid-item "
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

      <div className="kiosk-footer" style={{ textAlign: "center" }}>
        <GridMenu
          selectedIndex={selected_primary_slide_index}
          {...props} />
      </div>

    </div>
  )
}

GridSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  primary_slides: PropTypes.array.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  rotateActiveSlides: PropTypes.func.isRequired
}

export default GridSlide
