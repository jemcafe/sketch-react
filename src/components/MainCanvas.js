import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Brush from './Brush';

class MainCanvas extends Component {
   
  componentDidMount () {
    this.initCanvas();
  }

  initCanvas = () => {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.fillStyle = '#f0f0f0';  // The intial color of the canvas
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
      mouseLeave
    } = this.props;
    
    // canvas size
    const width = 400;
    const height = 400;

    // styles
    const style = {
      mainCanvasDiv: {
        width: width,
        height: height,
        margin: '0 auto',
        outline: '2px solid grey'
      },
      focusLayer: {
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
        zIndex: 1,
        width: width, 
        height: height,
        background: 'rgba(255,180,180,0.3)'
      },
      canvas: {
        zIndex: 0
      }
    }

    return (
      <div ref="mainCanvas" className="main-canvas" style={ style.mainCanvasDiv }>

        { (inCanvas || focus) &&
        <Brush mouse={ mouse } radius={ 10 } zIndex={ 1 } /> }

        { focus && 
        <div className="focus-layer" style={ style.focusLayer }
          onMouseMove={(e) => putPoint(this.refs.canvas, e)}
          onMouseUp={() => disengage(this.refs.canvas)}
          onMouseLeave={() => disengage(this.refs.canvas)}>
        </div> }

        <div ref="drawLayer" className="draw-layer" style={ style.drawLayer }
          onMouseDown={(e) => engage(this.refs.canvas, e)}
          onMouseMove={(e) => mousePosition(e)}
          onMouseLeave={() => mouseLeave()}>
        </div>

        <canvas ref="canvas" style={ style.canvas } width={ width } height={ height }/>

      </div>
    );
  }
}

MainCanvas.propTypes = {
  mouse: PropTypes.object.isRequired,
  focus: PropTypes.bool.isRequired,
  inCanvas: PropTypes.bool.isRequired,
  engage: PropTypes.func.isRequired,
  putPoint: PropTypes.func.isRequired,
  disengage: PropTypes.func.isRequired,
  mousePosition: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired
};

export default MainCanvas;