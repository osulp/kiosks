import React, {Component, PropTypes} from 'react';

var MyVideo = React.createClass({
    render: function() {
        return (
            <div>
                <video controls autoPlay src={this.props.src}>
                    <track kind="subtitles" label="English subtitles" src={this.props.en_src} srclang="en" default></track>
                    <track kind="subtitles" label="Spanish subtitles" src={this.props.es_src} srclang="es"></track>
                </video>
            </div>
        );
    }
});

class LargeMedia extends Component {

 constructor(props) {
    super(props);
    this.state = {slideAnimationClass: 'slide-entering'};
  }

  componentDidMount() {
  }

  setExitingTimeout() {
    const exiting = () => {
      this.setState({slideAnimationClass: 'slide-exiting'});
    };
    //This time is exactly based on the animation duration found in _donor_kiosk.scss
    this.exiting_timeout = setTimeout(exiting, 14650);
  }

  componentWillUnmount() {
  }

  render() {
    let slide = this.props.slide;
    return (
        <div>
            <MyVideo src={slide.video} en_src="/sintel-en.vtt" es_src="/sintel-es.vtt">
            </MyVideo>
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
