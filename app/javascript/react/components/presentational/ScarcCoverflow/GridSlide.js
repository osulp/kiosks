import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import Masonry from "masonry-layout"
import GridMenu from "./GridMenu"


const GridSlide = props => {
  const [selectedCollection, setSelectedCollection] = useState(0)
  const [slideAnimationClass, setSlideAnimationClass] = useState(
    "slide-entering"
  )
  const [imagesLoaded, setImagesLoaded] = useState(1)
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
    setSelectedCollection(selected_primary_slide_index)

    return () => {
      clearTimeout(hide_timeout)
      clearTimeout(exiting_timeout)
      clearTimeout(zoomTimeout)
    }
  }, [])

  useEffect(() => {
    setupGrid(selectedCollection)
  }, [selectedCollection])

  const setupGrid = (i) => {
    let msnry = new Masonry(document.querySelector(`.grid-${i}`) , {
      // options
      itemSelector: '.grid-item',
      gutter: 30
    });
  }

  const destroyGrid = (i) => {
    var msnry = Masonry.data(`.grid-${i}`)
    msnry.destroy()
  }

  const selected_primary_slide_index = props.primary_slides.findIndex(slide => slide.id === props.slide.collection.primary_slide.id)
  const all_slides_count = props.primary_slides.map(s => s.collection.slides.length).reduce((a,b) => a+b)

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

  const setCollection = i => {
    destroyGrid(selectedCollection)
    setSelectedCollection(i)
  }

  const selectedClassName = i => {
    return i == selectedCollection ? "selected" : ""
  }

  const selectedButtonClassName = i => {
    return i == selectedCollection ? "btn-primary" : ""
  }

  return (
    <div
      className={slideAnimationClass}
      onClick={() => {
        // TODO: handler for detail view
      }}
    >

      <div className="col-md-12" style={{ padding: "3% 3%" }}>
        <div id="grid_tabbed_panel" className="panel panel-default tabbed-panel">
          <div className="col-md-12 col-lg-12">
            <div className="row">
              <div className="panel-body container-fluid">
                <ul className="grid-menu">
                  {props.primary_slides.map((slide, i) => {
                    return (
                      <li key={`collection.${i}`} className={ `${selectedClassName(i)}` } data-index={i}>
                        <h1 style={{ color: "white" }}>{slide.collection.name}</h1>
                        <p style={{ color: "white", background: "blue", height: "100px" }}>{slide.collection.detail}</p>
                        <div className={`grid-content grid-content grid-${i}`} style={{ height: "730px !important" }}>
                          {slide.collection.slides.map((s, j) => {
                            return (
                              <div
                                className={
                                  "grid-item "
                                }
                                key={`slide.${i}.${j}`}
                                onClick={_e => slideClicked(j)}
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
                                  onLoad={() => {
                                    setImagesLoaded(imagesLoaded + 1)
                                    if (imagesLoaded == all_slides_count) {
                                      setupGrid(i)
                                    }
                                  }}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-12 menu-buttons">
            <div className="btn-group-horizontal kiosk-footer" style={{ textAlign: "center" }}>
              {props.primary_slides.map((slide, i) => {
                // alert(JSON.stringify(slide.collection.slides))
                return (
                  <button key={`collection.button.${i}`} data-index={i} onClick={() => { setCollection(i) }} type="button" className={`${selectedButtonClassName(i)} btn btn-default`}>{slide.caption}</button>
                )
              })}
            </div>
          </div>
        </div>

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
