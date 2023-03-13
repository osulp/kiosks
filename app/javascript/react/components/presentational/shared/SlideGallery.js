import { connect } from "react-redux"
import React, { Component } from "react"
import PropTypes from "prop-types"
import ImageGallery from "react-image-gallery"

class SlideGallery extends Component {
  onSlide(index) {
    // stop all videos
    document.querySelectorAll('video').forEach(vid => {
      vid.pause()
      vid.currentTime = 0
    })

    // play if next slide is a video
    let next_item = this.props.slides[index]

    if (next_item != undefined) {
      let myNextVideo = document.querySelector(`video.video-${next_item.id}`)
      if (myNextVideo != undefined) {
        this._imageGallery.pause()
        myNextVideo.load()
        myNextVideo.play()
      } else {
        this._imageGallery.play()
      }
    }
  }

  onClick(e) {
    console.log("onClick", e.target.src)
  }

  onImageError(e) {
    let error_message = `Unable to load: ${e.target.src}`
    console.log(error_message)
    this.props.addError(error_message)
  }

  onImageLoad(e) {
    console.log(`Image Loaded:${e.target.src})`)
  }

  prevSlide(e) {
    let currentIndex = this._imageGallery.getCurrentIndex()
    let prev_index = (currentIndex - 1 + this.props.slides.length) % this.props.slides.length
    this._imageGallery.slideToIndex(prev_index)
  }

  nextSlide(e) {
    let currentIndex = this._imageGallery.getCurrentIndex()
    let next_index = (currentIndex + 1) % this.props.slides.length
    this._imageGallery.slideToIndex(next_index)
  }

  onVideoEnded(e) {
    this.nextSlide()
  }

  itemPath(item) {
    let path = ""

    switch (item.current_kiosk) {
      case "tall":
        path = item.xtall
        break
      // NEW CASE: Add in a new case for the kiosk slide
      case "interactive-touch":
        path = item.image_slide
        break
      default:
        path = item.original
        break
    }
    return path
  }

  _renderItem(item) {
    const onImageError = this.onImageError
    const onImageLoad = this.onImageLoad
    const onVideoEnded = this.onVideoEnded

    return (
      <div className="image-gallery-image">
        { 
          item.av_media == undefined ?
            <img
              src={this.itemPath(item)}
              alt={`Image:${item.id} : ${item.original}`}
              srcSet={item.srcSet}
              sizes={item.sizes}
              onLoad={onImageLoad.bind(this)}
              onError={onImageError.bind(this)}
            />
          :
            <video muted className={`video-${item.id}`} onEnded={onVideoEnded.bind(this)} preload="auto">
              <source src={item.av_media} type='video/mp4'></source>
              {item.subtitle_en.length > 0 &&
                <track
                  kind="subtitles"
                  label="English subtitles"
                  src={item.subtitle_en}
                  srcLang="en"
                  default
                />
              }
              {item.subtitle_en.length > 0 &&
                <track
                  kind="subtitles"
                  label="Spanish subtitles"
                  src={item.subtitle_es}
                  srcLang="es"
                />
              }
            </video>
        }
      </div>
    )
  }

  componentDidUpdate() {
    this._imageGallery.slideToIndex(this.props.starting_slide_index)
  }

  render() {
    let slides = this.props.slides
    // Set the slide length and if no value exists then use the minimum of 5 seconds
    let slide_length = this.props.slides[0].slide_length
    // TODO: make a new component or customize ImageGallery for AdminKiosk. 
    // autoPlay: default should be true, but on AdminKiosk, it's expected to be false.
    return (
      <ImageGallery
        ref={i => (this._imageGallery = i)}
        items={slides}
        showThumbnails={false}
        showNav={this.props.show_nav}
        autoPlay={true}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
        onSlide={this.onSlide.bind(this)}
        onClick={this.onClick}
        onImageError={this.onImageError}
        onImageLoad={this.onImageLoad}
        renderItem={this._renderItem.bind(this)}
        startIndex={this.props.starting_slide_index}
        slideInterval={slide_length}
      />
    )
  }
}

SlideGallery.propTypes = {
  starting_slide_index: PropTypes.number.isRequired,
  slides: PropTypes.array.isRequired,
  addError: PropTypes.func.isRequired
}

export default SlideGallery
