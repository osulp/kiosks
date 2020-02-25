import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const MediaModal = props => {

  const backClicked = () => {
    props.slideClicked(props.slideZoomedIndex)
  }

  return (
    <div
      style={{
        display: props.visibility ? "block":"none",
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
          e.stopImmediatePropagation()
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
          I'm baby asymmetrical intelligentsia migas pabst pickled fanny pack paleo fingerstache, vape cloud bread VHS photo booth dreamcatcher heirloom affogato. Meggings bicycle rights pickled vice normcore lumbersexual salvia raw denim vinyl shabby chic scenester. VHS hot chicken kitsch craft beer art party wayfarers mustache shoreditch post-ironic. Shabby chic before they sold out jean shorts cronut jianbing messenger bag keffiyeh crucifix cray paleo.
          </div>
          <div
            style={{
              color: "#eeeeee90"
            }}
          >
          Vexillologist try-hard direct trade tilde, single-origin coffee vaporware brooklyn distillery ethical paleo whatever drinking vinegar heirloom hammock franzen.
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
  slideClicked: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  rotateActiveSlides: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired
}

export default MediaModal
