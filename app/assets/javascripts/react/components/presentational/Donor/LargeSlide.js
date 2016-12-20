import React, {Component, PropTypes} from 'react';

class LargeSlide extends Component {

  componentWillMount() {
    this.setState({slideAnimationClass: 'slide-entering'});
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({slideAnimationClass: 'slide-exiting'});
    }, 14650);
    setTimeout(() => {
      this.props.setModalVisibility(false);
      this.props.setModalRootComponent(undefined);
    }, 15000);
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
