import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const MediaModal = props => {

  const backClicked = () => {
    props.slideClicked(props.slideZoomedIndex)
  }

  return (
    <div
      style={{
        display: props.slideZoomedIndex >= 0 ? "block":"none",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        color: "#eee",
      }}
      onClick={backClicked}
    >
      <div
        className=""
        style={{
          backgroundColor: "#153b5a",
          border: "4px solid #4390da",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          height: "85%"
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          style={{
            textAlign: "center",
            margin: "30px"
          }}
        >
          <img
            src={props.slide.large}
          />
        </div>
        <div
          style={{
            margin: "5%"
          }}
        >
          <div>
            <h1> {props.slide.title} </h1>
          </div>
          <div
            style={{
              color: "#eeeeeeee"
            }}
          >
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
