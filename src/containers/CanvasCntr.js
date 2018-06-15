import React, { Component } from 'react';
import Canvas from '../components/Canvas';

class CanvasCntr extends Component {
   constructor () {
      super();
      this.state = {
         mouse: { x: 0, y: 0 },
         dragging: false,
         focus: false
      }
   }

   initCanvas = (canvas) => {
      // Canvas size
      canvas.width = 400;
      canvas.height = 400;

      // Context of the canvas
      const context = canvas.getContext('2d');

      // The intial color of the canvas
      context.fillStyle = '#f0f0f0';
      context.fillRect(0, 0, canvas.width, canvas.height);
   }

   engage = (canvas, e) => {
      this.setState({ dragging: true, focus: true });
   }

   disengage = (canvas) => {
      this.setState({ dragging: false, focus: false });
   }

   render() {
      return (
         <Canvas
            initCanvas={ this.initCanvas }
            engage={ this.engage }
            disengage={ this.disengage } />
      );
   }
}

export default CanvasCntr;