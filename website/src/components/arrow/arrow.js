// import React from "react";

// export default function Arrow({ direction, onClick }) {
//   return (
//     <span
//       className={`rmdp-arrow-container ${direction}`}
//       onClick={onClick}
//       aria-hidden="true"
//     >
//       <i className="rmdp-arrow"></i>
//     </span>
//   );
// }


// import propTypes from 'prop-types';
import React from 'react';

const Arrow = ({
  height, width, fill, ...others
}) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill='none' xmlns='http://www.w3.org/2000/svg' style={{ cursor: 'pointer' }} {...others}>
    <path d='M12 15L7 10L17 10L12 15Z' fill={fill} />
  </svg>

);

// CaretDown.propTypes = {
//   height: propTypes.number,
//   width: propTypes.number,
//   fill: propTypes.string,
// };

CaretDown.defaultProps = {
  height: 24,
  width: 24,
  fill: '#252629',
};

export default Arrow;

