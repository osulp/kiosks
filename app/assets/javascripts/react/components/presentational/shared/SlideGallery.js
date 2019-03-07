import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import ImageGallery from 'react-image-gallery';

class SlideGallery extends Component {
  onSlide() {
  }

  onClick(e) {
    console.log("onClick", e.target.src);
  }

  onImageError(e) {
    let error_message = `Unable to load: ${e.target.src}`;
    console.log(error_message);
    this.props.addError(error_message);
  }

  onImageLoad(e) {
    console.log(`Image Loaded:${e.target.src})`);
  }

  itemPath(item) {
    let path = '';

    switch(item.current_kiosk) {
      case 'tall':
        path = item.xtall;
        break;
      default:
        path = item.original;
        break;
    }
    return path;
  }

  _renderItem(item) {
    const onImageError = this.onImageError;
    const onImageLoad = this.onImageLoad;

    return (
      <div className='image-gallery-image'>
        <img src={this.itemPath(item)}
             alt={`Image:${item.id} : ${item.original}`}
             srcSet={item.srcSet}
             sizes={item.sizes}
             onLoad={onImageLoad.bind(this)}
             onError={onImageError.bind(this)}/>
      </div>
    )
  }

  componentDidUpdate() {
    this._imageGallery.slideToIndex(this.props.starting_slide_index);
  }

  render() {
    let slides = this.props.slides;
    // Set the slide length and if no value exists then use the minimum of 5 seconds
    let slide_length = this.props.slides[0].slide_length || 5000
    return (
      <ImageGallery ref={i => this._imageGallery = i }
                    items={slides}
                    showThumbnails={false}
                    showNav={this.props.show_nav}
                    autoPlay={true}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={true}
                    onSlide={this.onSlide}
                    onClick={this.onClick}
                    onImageError={this.onImageError}
                    onImageLoad={this.onImageLoad}
                    renderItem={this._renderItem.bind(this)}
                    startIndex={this.props.starting_slide_index}
                    slideInterval={slide_length}/>
    );
  }
}

SlideGallery.propTypes = {
  starting_slide_index: PropTypes.number.isRequired,
  slides: PropTypes.array.isRequired,
  addError: PropTypes.func.isRequired,
};

export default SlideGallery;
