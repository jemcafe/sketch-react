import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Canvas extends Component {
   
   componentDidMount () {
      this.props.initCanvas(this.refs.canvas);
   }

   render() {
      return (
         <div className="canvas">
            <canvas ref="canvas"/>
         </div>
      );
   }
}

Canvas.propTypes = {
   initCanvas: PropTypes.func.isRequired
};

export default Canvas;