import React from 'react'
import {connect} from 'react-redux'
import  {Handle}  from './Handle'

export default function managedShape(ManagedShape, subStore, getHandleCoordinates) {

  // lookup in the store
  const mapState = (state, ownProps) => {
    const shapeModel = state.scene[subStore].byIds[ownProps._id];

    return {
      svgAttributes: shapeModel.svgAttributes,
      style: shapeModel.style,
      transform: shapeModel.transform,
    }
  };
  function getHandleCoordinates(props) {
    return [{
      x: props.svgAttributes.cx, y:props.svgAttributes.cy
    }];
  }


  const ManagedClass = class extends React.PureComponent {

    constructor(props) {
      super(props);
    }

    render() {
      // filter _id as we do not need it anymore
      const {...passThroughProps } = this.props;
      console.log('rendering');
      let handles = this.props.isSelected ? getHandleCoordinates(this.props).map( (coord, idx) =>
          <Handle key={idx} x={coord.x}  y={coord.y}/>
        ) : [];

      return(
      <g>
        <ManagedShape {...passThroughProps}
        onClick={(e) => console.log(e)}>
        </ManagedShape>
        {handles}
      </g>);
    }
  };

  /* draggable stuf
  const shapeSource = {
    beginDrag(props) {
      console.log('DRAG BEGINNING...', props);
      return {};
    }
  };

  function collect(connect, monitor) {
    console.log('collecting', collect, monitor);
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }*/

  let managedShape = connect(mapState)(ManagedClass);
  return managedShape;
}





