import React from "react"
import PropTypes from "prop-types"

const MediaModal = props => {

  const backClicked = () => {
    props.slideClicked(props.slideZoomedIndex)
  }

  return (
    <div
      className="media-modal"
      style={{
        display: props.slideZoomedIndex >= 0 ? "block":"none"
      }}
      onClick={backClicked}
    >
      <div
        className="media-modal-box"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div style={{ textAlign: "center", margin: "30px" }}>
          <img src={props.slide.large} />
        </div>
        <div style={{ margin: "20px 40px" }}>
          <div>
            <h1> {props.slide.title} </h1>
          </div>
          <div style={{ color: "rgba(238, 238, 238, 0.7)" }}>
            {props.slide.caption}
          </div>
        </div>
      </div>
      <span className="back-button" onClick={backClicked}>
        BACK
      </span>
    </div>
  )
}

MediaModal.propTypes = {
  slide: PropTypes.object.isRequired,
  slideClicked: PropTypes.func.isRequired
}

export default MediaModal
