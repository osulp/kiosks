import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const MediaModal = props => {
  const [slideAnimationClass, setSlideAnimationClass] = useState(
    "slide-entering"
  )
  const [exitingTimeout, setExitingTimeout] = useState(undefined)
  const [hideTimeout, setHideTimeout] = useState(undefined)

  const backClicked = () => {
    // Remove previous timeouts
    clearTimeout(exitingTimeout)
    clearTimeout(hideTimeout)
    // Start exiting animation
    setSlideAnimationClass("slide-exiting")
    const hide_timeout = setTimeout(() => {
      // Close modal and reset to entering animation
      props.slideClicked(-1)
      setSlideAnimationClass("slide-entering")
    }, 150)
    setHideTimeout(hide_timeout)
  }

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(exitingTimeout)
      clearTimeout(hideTimeout)
    }
  }, [])

  // Setup exiting animation everytime modal comes up
  useEffect(() => {
    if (props.slide !== undefined) {
      clearTimeout(exitingTimeout)
      clearTimeout(hideTimeout)
      const exiting_timeout = setTimeout(() => {
        backClicked();
      }, 29650)
      setExitingTimeout(exiting_timeout)
    }
  }, [props.slide])

  // Default to displaying slide as an image. Render as video or audio of file allows it
  const renderMedia = () => {
    let avFile = props.slide.av_media
    let elem = (
      <MyImage
        src={props.slide.xlarge}
      />
    )
    if (avFile && (avFile.endsWith("m4v") || avFile.endsWith("mp4"))) {
      elem = (
        <MyVideo
          src={props.slide.av_media}
          en_src={props.slide.subtitle_en}
          es_src={props.slide.subtitle_es}
        />
      )
    } else if (avFile && avFile.endsWith("mp3")) {
      elem = (
        <MyAudio
          src={props.slide.av_media}
          thumb={props.slide.xlarge}
          alt={props.slide.caption}
        />
      )
    }
    return elem
  }

  // Display modal if slide is active in GridSlide
  return (
    <div
      className="media-modal"
      style={{
        display: props.slide === undefined ? "none":"block"
      }}
      onClick={backClicked}
    >
      <div
        className={slideAnimationClass}
        style={{ height: "100%" }}
      >
        <div
          className="media-modal-box"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {props.slide !== undefined &&
            <div style={{ textAlign: "center", margin: "30px" }}>
              {renderMedia()}
            </div>
          }
          {props.slide !== undefined &&
            <div style={{ margin: "20px 40px" }}>
              <div>
                <h1> {props.slide.title} </h1>
              </div>
              <div style={{ color: "rgba(238, 238, 238, 0.7)" }}>
                {props.slide.caption}
              </div>
            </div> 
          }
        </div>
      </div>
      <span className="back-button" onClick={backClicked}>
        BACK
      </span>
    </div>
  )
}

MediaModal.propTypes = {
  slide: PropTypes.object,
  slideClicked: PropTypes.func.isRequired
}

const MyVideo = props => {
  return (
    <video controls autoPlay src={props.src}>
      {props.en_src.length > 0 &&
      <track
        kind="subtitles"
        label="English subtitles"
        src={props.en_src}
        srcLang="en"
        default
      />
      }
      {props.es_src.length > 0 &&
      <track
        kind="subtitles"
        label="Spanish subtitles"
        src={props.es_src}
        srcLang="es"
      />
      }
    </video>
  )
}

const MyAudio = props => {
  return (
    <div>
      <img src={props.thumb} alt={props.alt} />
      <audio controls autoPlay src={props.src} />
    </div>
  )
}

const MyImage = props => {
  return (
    <img src={props.src} />
  )
}

export default MediaModal
