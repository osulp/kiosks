import React, { Component } from "react"
import PropTypes from "prop-types"

const MediaGrid = props => {

    // load all grids available for display using a tabbed-panel structure
    return (
      <div id="grid_tabbed_panel" className="panel panel-default tabbed-panel col-md-12 col-lg-12">
        <div className="panel-body">
          <GridList
            collections={props.primary_slides}
            selected_class={props.selectedClassName}
            slide_clicked={props.slideClicked}
            on_load_all_images={props.onLoadAllImages}
          />
        </div>
        <div className="col-md-12 col-lg-12 menu-buttons">
          <div className="grid-menu">
            {props.primary_slides.map((slide, i) => {
              return (
                <button 
                  key={`collection.button.${i}`} 
                  data-index={i} 
                  onClick={() => { props.setCollection(i) }} 
                  type="button" 
                  className={`${props.selectedButtonClassName(i)} btn btn-default`}
                >
                  {slide.caption}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
}

MediaGrid.propTypes = {
  primary_slides: PropTypes.array.isRequired,
  selectedButtonClassName: PropTypes.func.isRequired,
  slideClicked: PropTypes.func.isRequired,
  onLoadAllImages: PropTypes.func.isRequired,
  selectedClassName: PropTypes.func.isRequired,
  setCollection: PropTypes.func.isRequired
}

const GridList = props => {

  // load all grids (one for each collection) with header and content
  return(
    <ul>
      {props.collections.map((slide, i) => {
        return (
          <li key={`collection.${i}`} className={ `${props.selected_class(i)}` } data-index={i}>
            <div className="selected-collection-header">
              <h1 className="collection-name">{slide.collection.name}</h1>
              <p className="collection-description">{slide.collection.detail}</p>
            </div>
            <GridItem
              slides={slide.collection.slides}
              slide_clicked={props.slide_clicked}
              on_load_all_images={props.on_load_all_images}
              index={i}
            />
          </li>
        )
      })}
    </ul>
  )
}

const GridItem = props => {

  // load one grid (for one collection) and render all image slides for that
  // collection
  return(
    <div className={`grid-content grid-${props.index}`}>
      {props.slides.map((s, j) => {
        return (
          <div
            className={"grid-item"}
            key={`slide.${props.index}.${j}`}
            onClick={_e => props.slide_clicked(j)}
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
              onLoad={() => { props.on_load_all_images(props.index) }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MediaGrid
