import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Brush from './Brush';

class Canvas extends Component {
   
  componentDidMount () {
    this.props.initCanvas(this.refs.canvas);
  }

  render() {
    const { 
      focus, 
      engage, 
      putPoint,
      disengage,
      mouse,
      mousePosition
    } = this.props;

    // canvas size
    const width = 400;
    const height = 400;

    // styles
    const styles = {
      canvasOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width, 
        height: height,
        background: 'rgba(255,180,180,0.3)'
      }
    }

    return (
      <div className="canvas">

        <Brush mouse={mouse} radius={10} />

        { focus && 
        <div className="focus-overlay"
          onMouseMove={(e) => putPoint(this.refs.canvas, e)}
          onMouseUp={() => disengage(this.refs.canvas)}
          onMouseLeave={() => disengage(this.refs.canvas)}>
        </div> }

        <div className="canvas-overlay" style={ styles.canvasOverlay }
          onMouseDown={(e) => engage(this.refs.canvas, e)}
          onMouseMove={(e) => mousePosition(this.refs.canvas, e)}>
        </div>

        <canvas ref="canvas" width={ width } height={ height }/>

      </div>
    );
  }
}

Canvas.propTypes = {
  focus: PropTypes.bool.isRequired,
  initCanvas: PropTypes.func.isRequired,
  engage: PropTypes.func.isRequired,
  putPoint: PropTypes.func.isRequired,
  disengage: PropTypes.func.isRequired,
  mouse: PropTypes.object.isRequired,
  mousePosition: PropTypes.func.isRequired
};

export default Canvas;