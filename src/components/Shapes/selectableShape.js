import React from 'react'
import {connect} from 'react-redux'
import  Handle  from './Handle'
import { DragSource } from 'react-dnd';
import {updateSelectedItem } from './shapesReducers'

export default function selectableShape(Shape,
  numHandles, handleBuilders, shapeUpdate

) {

  // lookup in the store
  const mapState = (state, ownProps) => {
    return {
      isSelected: ownProps._id === state.scene.appState.selectedId
    }
  };

  const getHandleCoordinates = (props) => handleBuilders(props);



  const SelectableClass = class extends React.PureComponent {

    constructor(props) {
      super(props);
    }

    render() {
      // filter _id as we do not need it anymore
      const {
        connectDragHandle0,
        connectDragHandle1,
        connectDragHandle2,
        connectDragHandle3,

        ...passThroughProps } = this.props;

      let c = [connectDragHandle0, connectDragHandle1, connectDragHandle2, connectDragHandle3];

      let handleCoordinate = getHandleCoordinates(this.props);
      // calculate the shape
      if (this.props.draggingShape && this.props.draggedId === this.props._id) {
        shapeUpdate(this.props, passThroughProps, handleCoordinate)
      }

      let handles = this.props.isSelected ? handleCoordinate.map( (coord, idx) =>
          <Handle
            connectDragHandle={c[idx]}
            targetShape={passThroughProps._id} idx={idx}
            key={idx} x={coord.x}  y={coord.y}/>
        ) : [];

      return(
        <g>
          <Shape {...passThroughProps}
                        onClick={(e) => this.props.dispatch(updateSelectedItem(this.props._id))}>
          </Shape>
          {handles}
        </g>);
    }
  };

  let cpt ;
  cpt = connect(mapState)(SelectableClass);

  function collect(idx) {

    return function (connect, monitor) {
      let info = {
        ['connectDragHandle' + idx]: connect.dragSource(),
        draggedId: monitor.getItem() ? monitor.getItem().targetShape : void 0,
        draggingShape: !!monitor.getItem(),  // should check if it's the good stuff
        offset: monitor.getClientOffset(),
        handle: monitor.getItem() ? monitor.getItem().handleUsed : void 0,
      };
      return info;
    }
  }

  for (let i = 0; i < numHandles; i++) {

    (function() {
      const shapeSource = {
        beginDrag(props, monitor, component) {
          return {
            targetShape: props._id,
            handleUsed: i
          };
        },
        endDrag(props, monitor, component) {
          // we should record everything
        }
      };

      cpt = DragSource('SELECTHANDLE', shapeSource, collect(i))(cpt);
    }())
  }

  return cpt;
}



