import React, { Component } from 'react';
import Canvas from '../components/Canvas';

class CanvasCntr extends Component {
  constructor () {
    super();
    this.state = {
      mouse: {
        x: 0,
        y: 0
      },
      brush: {
        radius: 10,
        color: '#000000',
        selected: true
      },
      eraser: {
        radius: 5,
        color: '#ffffff',
        selected: false
      },
      dragging: false,
      focus: false
    }
  }

  initCanvas = (canvas) => {
    // Context of the canvas
    const context = canvas.getContext('2d');

    // The intial color of the canvas
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  engage = (canvas, e) => {
    this.setState({ dragging: true, focus: true });
    
    // A point is drawn
    this.putPoint(canvas, e, true);
  }

  disengage = (canvas) => {
    this.setState({ dragging: false, focus: false });

    // The path is reset, so the paths aren't connected
    canvas.getContext('2d').beginPath();
  }

  putPoint = (canvas, e, fire) => {
    const { mouse, brush, eraser, dragging } = this.state;

    // The selected tool (brush or eraser)
    const tool = brush.selected ? brush : eraser;

    // The location of the point is the mouse' position
    const { x, y } = this.canvasMousePosition(canvas, e);

    const context = canvas.getContext('2d');

    if ( dragging || fire ) {
      context.lineWidth = tool.radius * 2;
      context.lineCap = 'round';

      // End of the line path
      context.lineTo(x, y);

      // The stroke method draws the path defined by lineTo and moveTo
      context.strokeStyle = tool.color;
      context.stroke();
      
      // A circle is created using the arc method. The start and end angles make the arc a circle. 2*PI is one cycle around a circle in radians. 
      context.arc(x, y, tool.radius, 0, 2 * Math.PI);  // context.arc(x, y, radius, startAngle, endAngle, [antiClockwise]);

      // Fills the circle with a color (without fillStyle the color is black by default)
      context.fillStyle = tool.color;
      context.fill();

      // The path is reset
      context.beginPath();

      // Beginning of the line path
      context.moveTo(x, y);

      // The mouse position is set (for the brush and eraser)
      this.setState({ mouse: { x: e.clientX, y: e.clientY } });
    }
  }

  canvasMousePosition = (canvas, e) => {
    // Subtracting the canvas offset from the event coordinates get the coordinates relative to the canvas, which is needed for the mouse position outside of the canvas.
    // Adding the window offset gets the coordinates relative to the canvas when the window page is scrolled.
    return {
      x: e.clientX - canvas.offsetLeft + window.pageXOffset,
      y: e.clientY - canvas.offsetTop + window.pageYOffset
    };
  }

  mousePosition = (canvas, e) => {
    console.log('Mouse Position',{ x: e.clientX, y: e.clientY });
    this.setState({
      mouse: { x: e.clientX, y: e.clientY }
    });
  }

  render() {
    return (
      <Canvas
        focus={ this.state.focus }
        initCanvas={ this.initCanvas }
        engage={ this.engage }
        putPoint={ this.putPoint }
        disengage={ this.disengage }
        mouse={ this.state.mouse }
        mousePosition={ this.mousePosition } />
    );
  }
}

export default CanvasCntr;