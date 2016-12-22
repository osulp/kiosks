import React, {Component, PropTypes} from 'react';

class LargeSlide extends Component {

 constructor(props) {
    super(props);
    this.state = {slideAnimationClass: 'slide-entering'};
  }

  componentDidMount() {
    this.setExitingTimeout();
    this.setHideTimeout();
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
    clearTimeout(this.hide_timeout);
    clearTimeout(this.exiting_timeout);
  }

  render() {
    let slide = this.props.slide;
    return (
      <div className={`container modal-container ${this.state.slideAnimationClass}`}>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 modal-image-col">
            <div className="panel panel-default modal-panel">
              <div className="panel-body modal-panel-body">
                <img src={slide.xlarge}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row modal-bottom-row">
          <div className="col-md-12 modal-caption-col">
            <div className="panel panel-default caption-panel">
              <div className="panel-body">
                <div className="caption-container">
                  <div className="row text-center h1">
                    {slide.title}
                  </div>
                  <div className="row text-center caption-text">
                    <p>
                      {slide.caption}
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

LargeSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
};

export default LargeSlide;
