import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Canvas extends Component {
   
  componentDidMount () {
    this.props.initCanvas(this.refs.canvas);
  }

  render() {
    const { focus, engage, disengage } = this.props;

    return (
      <div className="canvas">

        { focus && 
        <div className="focus-overlay" 
          onMouseUp={() => disengage(this.refs.canvas)}
          onMouseLeave={() => disengage(this.refs.canvas)}>
        </div> }

        <canvas ref="canvas" onMouseDown={(e) => engage(this.refs.canvas, e)}/>

      </div>
    );
  }
}

Canvas.propTypes = {
  focus: PropTypes.bool.isRequired,
  initCanvas: PropTypes.func.isRequired,
  engage: PropTypes.func.isRequired,
  disengage: PropTypes.func.isRequired
};

export default Canvas;