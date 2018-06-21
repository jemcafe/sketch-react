import React from 'react';
import PropTypes from 'prop-types';

function Brush (props) {
   const { radius, mouse } = props;

   // 
   const stroke = '#000000';
   const strokeWidth = 1;
   const fill = 'transparent';
   const r = radius;
   const width = (r * 2) + (strokeWidth * 2);
   const height = (r * 2) + (strokeWidth * 2);
   const cx = r + strokeWidth;
   const cy = r + strokeWidth;
   const pos = { 
      x: -r + mouse.x - 1, 
      y: -r + mouse.y - 1
   };

   // styles
   const styles = {
      svg: {
         position: 'fixed',
         top: pos.y,
         left: pos.x,
      }
   }

   return (
      <svg width={ width } height={ height } style={ styles.svg }>
         <circle cx={ cx } cy={ cy } r={ r } stroke={ stroke } strokeWidth={ strokeWidth } fill={ fill } />
      </svg>
   );
}

Brush.propTypes = {
   radius: PropTypes.number.isRequired,
   mouse: PropTypes.object.isRequired
}

export default Brush;