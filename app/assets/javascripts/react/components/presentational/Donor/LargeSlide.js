import React, {Component, PropTypes} from 'react';
import { DefaultPlayer as Video } from 'react-html5video';

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

class LargeSlide extends Component {

 constructor(props) {
    super(props);
    this.state = {slideAnimationClass: 'slide-entering'};
  }

  componentDidMount() {
    // this.setExitingTimeout();
    // this.setHideTimeout();
  }

  setExitingTimeout() {
    const exiting = () => {
      this.setState({slideAnimationClass: 'slide-exiting'});
    };
    //This time is exactly based on the animation duration found in _donor_kiosk.scss
    this.exiting_timeout = setTimeout(exiting, 14650);
  }

  setHideTimeout() {
    const hide = () => {
      this.props.setModalVisibility(false);
      this.props.setModalRootComponent(undefined);
    };
    this.hide_timeout = setTimeout(hide, 15000);
  }

  componentWillUnmount() {
    // clearTimeout(this.hide_timeout);
    // clearTimeout(this.exiting_timeout);
  }



  render() {
    let slide = this.props.slide;
    return (
        <div>
            <MyVideo src="https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4" en_src="/sintel-en.vtt" es_src="/sintel-es.vtt">
            </MyVideo>
        </div>
    );
  }
}

LargeSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
};

export default LargeSlide;
