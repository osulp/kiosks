import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConnectedModalWindow from "../../ModalWindow"
import Coverflow from "react-coverflow"
import LargeSlide from "./LargeSlide"
import { trackClicked } from "../shared/GoogleAnalytics"

function NavButton(props) {
  return (
    <button {...props} className="nav-button" />
  );
}

function NavSpacer({ width }) {
  return (
    <div
      style={{ display: "inline-block", width }}
    />
  );
}

const Kiosk = props => {
  // Set local state variables and setter methods
  const [active, setActive] = useState({ index: 1, slide: undefined })
  const [primary_slides, setPrimarySlides] = useState([])
  const [restart_kiosk_timeout, setRestartKioskTimeout] = useState(undefined)
  const [
    restart_active_slide_rotation_timeout,
    setRestartActiveSlideRotationTimeout
  ] = useState(undefined)

  // When active or active_slide state changes, determine what to do;
  // - If the active slide is set, then clear the timers and display the popup modal with the LargeSlide UI
  // - Otherwise, set the active slide rotation timer
  useEffect(() => {
    if (active.slide !== undefined) {
      setTimers(undefined, undefined)
      setIsRotating(false)
      props.setModalVisibility(true)
      // give reference to the rotation function so that when the back button is tapped
      // or the slide is automatically hidden, it can initiate the rotation to resume
      props.setModalRootComponent(
        <LargeSlide
          slide={active.slide}
          rotateActiveSlides={rotateActiveSlides}
          {...props}
        />
      )
    } else {
      // Start the slide rotation if it isn't already running and if the user
      // hadn't tapped a slide to make it active. Otherwise, if a user had tapped
      // a slide to make it active, then clear all of the rotation timers
      // and set a long delay to restart the rotation. If a user hadn't interacted with the
      // UI for many seconds, then restart the automatic rotation.
      if (isRotating == false) {
        rotateActiveSlides()
      } else if (active.slide) {
        setIsRotating(false)
        setTimers(
          undefined,
          setTimeout(() => {
            rotateActiveSlides()
          }, 45000)
        )
      }
    }
    // When the Kiosk component is unmounted, clear out all of the timers beforehand
    return () => {
      clearInterval(restart_kiosk_timeout)
      clearTimeout(restart_active_slide_rotation_timeout)
    }
  }, [active, isRotating])

  // One time, when the Kiosk UI is first mounted, fetch some data and filter the slides.
  // The behavior happens because the trailing empty array `useEffect(fn, [])` causes React
  // hooks to only first this function on component mount.
  useEffect(() => {
    const interval_id = setInterval(() => {
      props.fetchRestartKiosk(props.url)
    }, 1 * 60 * 1000)
    setRestartKioskTimeout(interval_id)
    const slide_ids = props.slides.map(s => s.collection.primary_slide.id)
    setPrimarySlides(
      props.slides.filter(e => slide_ids.findIndex(a => a === e.id) > -1)
    )
    setActive({ index: 1, slide: undefined })
    setCurrentIndex(1)
  }, [])


  // This effect takes care of rotating the primary slides, selecting the next
  // index and set it as active for 30 seconds. When last index is reached,
  // it rotates to index 0 to continue the loop.
  let [currentIndex, setCurrentIndex] = useState(1);
  let [isRotating, setIsRotating] = useState(true);
  useEffect(() => {
    if (isRotating) {
      let timeout = setTimeout(() => {
        let test_index = (currentIndex + 1) % primary_slides.length
        setCurrentIndex(test_index)
        setActive({ index: test_index, slide: undefined })
      }, 30000);
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isRotating, primary_slides]);

  // Clear all timers, and trigger the isRotating flag to start rotating slides
  const rotateActiveSlides = () => {
    setTimers(undefined, undefined)
    setIsRotating(true);
  }

  const nextSlide = () => {
    let next_index = (currentIndex + 1) % primary_slides.length
    setActive({ index: next_index, slide: undefined })
    setCurrentIndex(next_index);
  }

  const prevSlide = () => {
    let prev_index = (currentIndex - 1 + primary_slides.length) % primary_slides.length
    setActive({ index: prev_index, slide: undefined })
    setCurrentIndex(prev_index);
  }

  // When a slide is clicked, set local state active and active_slide to change
  // and the side effect function to operate. On the first click, this causes
  // the slide to scroll to the foreground. On the second click, if the slide is
  // currently active (in the foreground) then the LargeSlide UI modal will be displayed
  const slideClicked = (_e, slide, index, props) => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:ScarcCoverflowKiosk:SlideClicked`
    )
    setTimers(undefined, undefined)
    setCurrentIndex(index)
    if (active.index == index) {
      setActive({ index: index, slide: slide })
    } else {
      setActive({ index: index, slide: undefined })
    }
  }

  const setTimers = (slide_timeout, restart_active_timeout) => {
    clearTimeout(restart_active_slide_rotation_timeout)
    setRestartActiveSlideRotationTimeout(restart_active_timeout)
  }

  return (
    <div id="scarc_coverflow_kiosk" style={{ backgroundColor: "#003B5C" }}>
      <ConnectedModalWindow />
      <div className="component">
        <Coverflow
          displayQuantityOfSide={2}
          navigation={false}
          infiniteScroll={true}
          enableScroll={true}
          clickable={true}
          enableHeading={false}
          active={active.index}
          currentFigureScale={2}
          otherFigureScale={1}
        >
          {primary_slides.map((slide, i) => {
            return (
              <div
                key={`slide.${i}`}
                data-slide_index={i}
                onClick={e => slideClicked(e, slide, i, props)}
                onKeyDown={e => slideClicked(e, slide, i, props)}
                role="menuitem"
                tabIndex={i}
                style={{
                    height: "280px",
                    padding: "0 0 40px 0"
                }}
              >
                <img
                  src={slide.large}
                  style={{
                    display: "block",
                    width: "auto",
                    height: "100%",
                    margin: "0 auto"
                  }}
                />
                <span className="caption">{slide.caption}</span>
              </div>
            )
          })}
        </Coverflow>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <div className="kiosk-header" style={{ textAlign: "right" }}>

        <NavButton aria-label="Back" onClick={() => { prevSlide() }}>Back</NavButton>
        <NavSpacer width="200px" />
        <NavButton aria-label="Next" onClick={() => { nextSlide() }}>Next</NavButton>
        </div>
      </div>
    </div>
  )
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  kiosk_name: PropTypes.string,
  kiosk_id: PropTypes.string,
  restart_kiosk: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  google_analytics: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  fetchRestartKiosk: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired
}

export default Kiosk
