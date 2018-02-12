import React, {Component, PropTypes} from 'react';

var MyVideo = React.createClass({
    render: function() {
        return (
            <div>
                <video controls autoPlay src={this.props.src}>
                    <track kind="subtitles" label="English subtitles" src={this.props.en_src} srcLang="en" default></track>
                </video>
            </div>
        );
    }
});

class LargeMedia extends Component {

 constructor(props) {
    super(props);
    this.state = {slideAnimationClass: 'slide-up-fade-in'};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    clearTimeout(this.hide_timeout);
    clearTimeout(this.exiting_timeout);
  }

  render() {
    let slide = this.props.slide;
    return (
      <div className={`container modal-container ${this.state.slideAnimationClass}`}>
        <div className="row media-large-image-row">
          <div className="col-md-10 modal-image-col">
            <div className="panel panel-default modal-panel">
                <div className="panel-body media-body-large">
                    <MyVideo src={slide.video} en_src={slide.subtitle} >
                    </MyVideo>
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
