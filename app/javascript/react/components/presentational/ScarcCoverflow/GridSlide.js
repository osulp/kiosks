import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Masonry from "masonry-layout"
import MediaGrid from "./MediaGrid"
import MediaModal from "./MediaModal"

const GridSlide = props => {
  const [selectedCollection, setSelectedCollection] = useState(0)
  const [slideAnimationClass, setSlideAnimationClass] = useState(
    "slide-entering"
  )
  const [imagesLoaded, setImagesLoaded] = useState(1)
  const [activeSlide, setActiveSlide] = useState(undefined)
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
    setSelectedCollection(selected_coverflow_collection_index)

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(exitingTimeout)
    }
  }, [])

  useEffect(() => {
    setupGrid(selectedCollection)
    reloadGrid(selectedCollection)
  }, [selectedCollection])

  const setupGrid = (i) => {
    let msnry = Masonry.data(`.grid-${i}`)
    if (msnry == undefined) {
      msnry = new Masonry(`.grid-${i}`, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 55,
        gutter: 30
      });
    }
    msnry.layout()
  }

  const onLoadAllImages = () => {
    setImagesLoaded(imagesLoaded + 1)
    if (imagesLoaded == all_slides_count) {
      setupGrid(selected_coverflow_collection_index)
    }
  }

  const reloadGrid = (i) => {
    var msnry = Masonry.data(`.grid-${i}`)
    if (msnry != undefined) {
      msnry.reloadItems()
    }
  }

  const selected_coverflow_collection_index = props.primary_slides.findIndex(slide => slide.id === props.collection.primary_slide.id)
  const all_slides_count = props.primary_slides.map(s => s.collection.slides.length).reduce((a,b) => a+b)

  const slideClicked = i => {
    setActiveSlide(i >= 0 ? props.slides.find(e => e.id == props.primary_slides[selectedCollection].collection.slides[i].id) : undefined)
  }

  const setCollection = i => {
    setSelectedCollection(i)
    reloadGrid(i)
  }

  const selectedClassName = i => {
    return i == selectedCollection ? "selected" : ""
  }

  const selectedButtonClassName = i => {
    return i == selectedCollection ? "btn-primary" : ""
  }

  return (
    <div className={slideAnimationClass}>
      <MediaModal
        slideClicked={slideClicked}
        slide={activeSlide}
        {...props}
      />
      <MediaGrid
        selectedButtonClassName={selectedButtonClassName}
        slideClicked={slideClicked}
        onLoadAllImages={onLoadAllImages}
        selectedClassName={selectedClassName}
        setCollection={setCollection}
        primary_slides={props.primary_slides}
      />
    </div>
  )
}

GridSlide.propTypes = {
  collection: PropTypes.object.isRequired,
  primary_slides: PropTypes.array.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  rotateActiveSlides: PropTypes.func.isRequired
}

export default GridSlide
