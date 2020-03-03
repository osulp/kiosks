import React, { useEffect, useState } from "react"
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
    setSelectedCollection(selected_collection_index)

    return () => {
      clearTimeout(hide_timeout)
      clearTimeout(exiting_timeout)
    }
  }, [])

  useEffect(() => {
    destroyGrid(selectedCollection)
    setupGrid(selectedCollection)
  }, [selectedCollection])

  const setupGrid = (i) => {
    let msnry = Masonry.data(`.grid-${i}`)
    if (msnry == undefined) {
      msnry = new Masonry(document.querySelector(`.grid-${i}`) , {
        // options
        itemSelector: '.grid-item',
        gutter: 30
      });
    }
    msnry.layout()
  }

  const destroyGrid = (i) => {
    var msnry = Masonry.data(`.grid-${i}`)
    if (msnry != undefined) {
      msnry.destroy()
    }
  }

  const selected_collection_index = props.primary_slides.findIndex(slide => slide.id === props.slide.collection.primary_slide.id)
  const all_slides_count = props.primary_slides.map(s => s.collection.slides.length).reduce((a,b) => a+b)

  const slideClicked = i => {
    // TODO: handler for selected slide (detail)
  }

  const setCollection = i => {
    if (i != selectedCollection) {
      destroyGrid(selectedCollection)
    }
    setSelectedCollection(i)
  }

  const selectedClassName = i => {
    return i == selectedCollection ? "selected" : ""
  }

  const selectedButtonClassName = i => {
    return i == selectedCollection ? "btn-primary" : ""
  }

  return (
    <div className={slideAnimationClass}>
      <div id="grid_tabbed_panel" className="panel panel-default tabbed-panel col-md-12 col-lg-12">
        <div className="panel-body">
          <ul>
            {props.primary_slides.map((slide, i) => {
              return (
                <li key={`collection.${i}`} className={ `${selectedClassName(i)}` } data-index={i}>
                  <div className="selected-collection-header">
                    <h1 className="collection-name">{slide.collection.name}</h1>
                    <p className="collection-description">{slide.collection.detail}</p>
                  </div>
                  <div className={`grid-content grid-${i}`}>
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
        <div className="col-md-12 col-lg-12 menu-buttons">
          <div className="grid-menu">
            {props.primary_slides.map((slide, i) => {
              return (
                <button key={`collection.button.${i}`} data-index={i} onClick={() => { setCollection(i) }} type="button" className={`${selectedButtonClassName(i)} btn btn-default`}>{slide.caption}</button>
              )
            })}
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
