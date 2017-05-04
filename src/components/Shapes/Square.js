import React from 'react'

export const Square = (props) => {

  const {connectDragSource, ...passThroughProps } = props;

  if (passThroughProps.width < 0) {
    passThroughProps.x = passThroughProps.x + passThroughProps.width;
    passThroughProps.width = Math.abs(passThroughProps.width);
  }

  if (passThroughProps.height < 0) {
    passThroughProps.y = passThroughProps.y + passThroughProps.height;
    passThroughProps.height = Math.abs(passThroughProps.height);

  }

  return (
    connectDragSource(<rect
      {...passThroughProps}
    >
    </rect>)
  );
};

