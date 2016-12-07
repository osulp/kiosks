import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

class Error extends Component {
  render() {
    return (
      <div id="error">
        {this.props.errors.map((e, i, a) => { return (<span key={`error.${i}`}>{e.message}</span>)})}
      </div>
    );
  }
}

Error.propTypes = {
  errors: PropTypes.array,
};

export default Error;
