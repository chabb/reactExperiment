import React from 'react'

export const Circle = (props) => {
  // we can remove this extracting logic
  const {connectDragSource, ...passThroughProps } = props;
  if (connectDragSource) {
    return (connectDragSource(<circle {...passThroughProps}/>));
  } else {
    return <circle {...passThroughProps}/>;
  }
};




