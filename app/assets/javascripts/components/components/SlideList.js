import React, { Component, PropTypes } from 'react';

class SlideList extends Component {

  render() {

    const { slides, setSlides } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    const handleKeyUp = (e) => {
      console.log(`handleKeyUp, ${e.keyCode}`);
      if(e.keyCode == 13){
        if (typeof App !== 'undefined'){
          //App.room.speak(e.target.value);
        }else{
          setSlides();
        }
        e.target.value = "";
      };
    };

    return (
      <div className="container" role="main">
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Panel title</h3>
              </div>
              <ul className="panel-body">
                {slides.map((s) => {
                  return <li key={`slide.${s.id}`}>{s.content}</li>;
                })
                }
              </ul>
              <form onSubmit={handleSubmit}>
                <input type="text" onKeyUp={handleKeyUp}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SlideList.propTypes = {
  slides: PropTypes.any,
};

export default SlideList;
