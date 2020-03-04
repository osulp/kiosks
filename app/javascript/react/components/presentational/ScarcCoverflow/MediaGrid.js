import React, { Component } from "react"
import PropTypes from "prop-types"

function GridList({collections, selected_class, slide_clicked, on_load_all_images}) {
  return(
    <ul>
      {collections.map((slide, i) => {
        return (
          <li key={`collection.${i}`} className={ `${selected_class(i)}` } data-index={i}>
            <div className="selected-collection-header">
              <h1 className="collection-name">{slide.collection.name}</h1>
              <p className="collection-description">{slide.collection.detail}</p>
            </div>
            <GridItem
              slides={slide.collection.slides}
              slide_clicked={slide_clicked}
              on_load_all_images={on_load_all_images}
              index={i}
            />
          </li>
        )
      })}
    </ul>
  );
}

function GridItem({slides, slide_clicked, on_load_all_images, index}) {
  return(
    <div className={`grid-content grid-${index}`}>
      {slides.map((s, j) => {
        return (
          <div
            className={"grid-item"}
            key={`slide.${index}.${j}`}
            onClick={_e => slide_clicked(j)}
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
              onLoad={() => { on_load_all_images(index) }}
            />
          </div>
        )
      })}
    </div>
  );
}

class MediaGrid extends Component {

  render() {
    return (
      <div id="grid_tabbed_panel" className="panel panel-default tabbed-panel col-md-12 col-lg-12">
        <div className="panel-body">
          <GridList
            collections={this.props.primary_slides}
            selected_class={this.props.selectedClassName}
            slide_clicked={this.props.slideClicked}
            on_load_all_images={this.props.onLoadAllImages}
          />
        </div>
        <div className="col-md-12 col-lg-12 menu-buttons">
          <div className="grid-menu">
            {this.props.primary_slides.map((slide, i) => {
              return (
                <button key={`collection.button.${i}`} data-index={i} onClick={() => { this.props.setCollection(i) }} type="button" className={`${this.props.selectedButtonClassName(i)} btn btn-default`}>{slide.caption}</button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

MediaGrid.propTypes = {
  primary_slides: PropTypes.array.isRequired,
  selectedButtonClassName: PropTypes.func.isRequired,
  slideClicked: PropTypes.func.isRequired,
  onLoadAllImages: PropTypes.func.isRequired,
  selectedClassName: PropTypes.func.isRequired,
  setCollection: PropTypes.func.isRequired
}

export default MediaGrid
