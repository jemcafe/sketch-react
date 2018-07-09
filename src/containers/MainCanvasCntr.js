import React, { Component } from 'react';
import MainCanvas from '../components/MainCanvas';

class MainCanvasCntr extends Component {
  constructor () {
    super();
    this.state = {
      brush: {
        radius: 10,
        color: '#000000',
        selected: true
      },
      mouse: { x: 0, y: 0 },
      inCanvas: false,
      dragging: false,
      focus: false,
    }
  }

  engage = (canvas, e) => {
    this.setState({ dragging: true, focus: true });
    this.putPoint(canvas, e, true);  // A point is drawn
  }

  disengage = (canvas) => {
    this.setState({ inCanvas: false, dragging: false, focus: false });
    canvas.getContext('2d').beginPath();  // The path is reset, so the paths aren't connected
  }

  putPoint = (canvas, e, fire) => {
    const context = canvas.getContext('2d');
    const { brush, eraser, dragging } = this.state;
    const tool = brush.selected ? brush : eraser;         // The selected tool (brush or eraser)
    const { x, y } = this.canvasMousePosition(canvas, e); // The location of the point is the mouse' position

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

      // The mouse position is set
      this.mousePosition(e);
    }
  }

  canvasMousePosition = (canvas, e) => ({
    x: e.clientX - canvas.offsetLeft + window.pageXOffset,
    y: e.clientY - canvas.offsetTop + window.pageYOffset
  })

  mousePosition = (e) => {
    this.setState({ 
      mouse: { x: e.clientX, y: e.clientY }, 
      inCanvas: true 
    });
  }

  mouseLeave = () => {
    this.setState({ inCanvas: false });
  }

  render() {
    return (
      <MainCanvas
        mouse={ this.state.mouse }
        focus={ this.state.focus }
        inCanvas={ this.state.inCanvas }
        engage={ this.engage }
        putPoint={ this.putPoint }
        disengage={ this.disengage }
        mousePosition={ this.mousePosition }
        mouseLeave={ this.mouseLeave } />
    );
  }
}

export default MainCanvasCntr;