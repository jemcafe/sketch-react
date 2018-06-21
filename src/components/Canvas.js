import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Brush from './Brush';

class Canvas extends Component {
   
  componentDidMount () {
    // canvas
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');

    // The intial color of the canvas
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    const { 
      focus, 
      mouse,
      inCanvas,
      engage, 
      putPoint,
      disengage,
      mousePosition,
      mouseOut
    } = this.props;

    // canvas size
    const width = 400;
    const height = 400;

    // styles
    const styles = {
      focusOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100vw',
        height: '100vh',
        background: '#c0d9ff',
        opacity: 0.4
      },
      drawLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: width, 
        height: height,
        background: 'rgba(255,180,180,0.3)'
      },
      canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }
    }

    return (
      <div className="main-canvas">

        { (inCanvas || focus) &&
        <Brush mouse={ mouse } radius={ 10 } zIndex={ 1 } /> }

        { focus && 
        <div className="focus-overlay" style={ styles.focusOverlay }
          onMouseMove={(e) => putPoint(this.refs.canvas, e)}
          onMouseUp={() => disengage(this.refs.canvas)}
          onMouseLeave={() => disengage(this.refs.canvas)}>
        </div> }

        <div className="draw-layer" style={ styles.drawLayer }
          onMouseDown={(e) => engage(this.refs.canvas, e)}
          onMouseMove={(e) => mousePosition(this.refs.canvas, e)}
          onMouseLeave={() => mouseOut() }>
        </div>

        <canvas ref="canvas" style={ styles.canvas } width={ width } height={ height }/>

      </div>
    );
  }
}

Canvas.propTypes = {
  mouse: PropTypes.object.isRequired,
  focus: PropTypes.bool.isRequired,
  inCanvas: PropTypes.bool.isRequired,
  engage: PropTypes.func.isRequired,
  putPoint: PropTypes.func.isRequired,
  disengage: PropTypes.func.isRequired,
  mousePosition: PropTypes.func.isRequired,
  mouseOut: PropTypes.func.isRequired
};

export default Canvas;