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
      canvas: {
        zIndex: 0
      },
      focus_layer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#c0d9ff',
        opacity: 0.4
      },
      draw_canvas: {
        position: 'absolute',
        background: 'rgba(255,180,180,0.3)',
        transform: `translate(${-width}px, 0)`
      },
    }

    return (
      <div ref="mainCanvas" className="main-canvas" style={ style.mainCanvasDiv }>

        <canvas ref="canvas" style={ style.canvas } width={ width } height={ height }/>

        { (inCanvas || focus) && <Brush mouse={ mouse } radius={ 10 } zIndex={ 0 } /> }

        <canvas className="draw-canvas" style={ style.draw_canvas } width={ width } height={ height }
          onMouseDown={(e) => engage(this.refs.canvas, e)}
          onMouseMove={(e) => mousePosition(e)}
          onMouseLeave={() => mouseLeave()}/>

        { focus && 
        <div className="focus-layer" style={ style.focus_layer }
          onMouseMove={(e) => putPoint(this.refs.canvas, e)}
          onMouseUp={() => disengage(this.refs.canvas)}
          onMouseLeave={() => disengage(this.refs.canvas)}>
        </div> }

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