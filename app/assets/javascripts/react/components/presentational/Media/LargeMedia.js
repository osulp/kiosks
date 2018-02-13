import React, {Component, PropTypes} from 'react';

var MyVideo = React.createClass({
    render: function() {
        if (this.props.en_src.length == 0 && this.props.es_src.length == 0) {
            return (
                <div>
                    <video controls autoPlay src={this.props.src}>
                    </video>
                </div>
            );
        } else if (this.props.en_src.length > 0 && this.props.es_src.length == 0) {
            return (
                <div>
                    <video controls autoPlay src={this.props.src} >
                        <track kind="subtitles" label="English subtitles" src={this.props.en_src} srcLang="en" default></track>
                    </video>
                </div>
            );
        } else if (this.props.en_src.length == 0 && this.props.es_src.length > 0) {
            return (
                <div>
                    <video controls autoPlay src={this.props.src} >
                        <track kind="subtitles" label="Spanish subtitles" src={this.props.es_src} srcLang="es"></track>
                    </video>
                </div>
            );
        } else {
            return (
                <div>
                    <video controls autoPlay src={this.props.src} >
                        <track kind="subtitles" label="English subtitles" src={this.props.en_src} srcLang="en" default></track>
                        <track kind="subtitles" label="Spanish subtitles" src={this.props.es_src} srcLang="es"></track>
                    </video>
                </div>
            );
        }
    }
});

var MyAudio = React.createClass({
    render: function () {
       return (
           <div>
               <img src={this.props.thumb} alt={this.props.alt} ></img>
               <audio controls autoPlay src={this.props.src} >
               </audio>
           </div>
       );
    }
});

class LargeMedia extends Component {

 constructor(props) {
    super(props);
    this.state = {slideAnimationClass: 'slide-up-fade-in'};
  }

  componentWillUnmount() {
    clearTimeout(this.hide_timeout);
    clearTimeout(this.exiting_timeout);
  }

  renderMedia() {
     let slide = this.props.slide;
     if (slide.av_media.endsWith("m4v")) {
         return (
             <MyVideo src={slide.av_media} en_src={slide.subtitle_en} es_src={slide.subtitle_es} >
             </MyVideo>
         )
     } else if (slide.av_media.endsWith("mp3")) {
        return (
            <MyAudio src={slide.av_media} thumb={slide.xlarge} alt={slide.caption} >
             </MyAudio>
        )
     }
  }


  render() {
    let slide = this.props.slide;
    return (
      <div className={`container-fluid modal-container ${this.state.slideAnimationClass}`}>
        <div className="row media-large-image-row">
          <div className="col-lg-offset-1 col-md-12 col-sm-12 modal-image-col">
            <div className="panel panel-default modal-panel">
                <div className="panel-body media-body-large">
                    {this.renderMedia()}
                </div>
            </div>
          </div>
        </div>
        <div className="row modal-bottom-row">
          <div className="col-md-12 modal-caption-col">
            <div className="panel panel-default caption-panel">
              <div className="panel-body new-background">
                <div className="caption-container">
                  <div className="text-center caption-text">
                      <h1>{slide.title}</h1>
                  </div>
                  <div className="text-center caption-text">
                      <p><b>{slide.caption}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LargeMedia.propTypes = {
  slide: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
};

export default LargeMedia;
