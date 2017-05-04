import React from 'react'

export const Line = (props) => {
  const {connectDragSource, ...passThroughProps } = props;
  if (connectDragSource) {
    return (connectDragSource(<line {...passThroughProps}/>));
  } else {
    return <line {...passThroughProps}/>;
  }
};

