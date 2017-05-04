import React from 'react'

import { DragSource } from 'react-dnd';
import {connect} from 'react-redux'
import {updateCircleAction} from './shapesReducers';


// or use a custom layer

export default function draggableShape(Shape) {

  const shapeSource = {
    beginDrag(props) {
      return  {
        dragId: props._id
      }
    },
    endDrag(props, monitor, component) {
      const endOffset = monitor.getDifferenceFromInitialOffset();
      // we should tell managedShape that we need to update the state
      let x = !props.transform ? 0 : props.transform.x;
      let y = !props.transform ? 0 : props.transform.y;

      let diff = monitor.getDifferenceFromInitialOffset();

      props.dispatch(updateCircleAction({
        id: props._id,
        svgAttributes: props.svgAttributes,
        style: props.style,
        transform: {
          x: diff.x + x,
          y: diff.y + y
        }
      }))

    }
  };

  const collect = function(connect, monitor) {
    let info = {
      connectDragSource: connect.dragSource(),
      dragging: monitor.isDragging(),
      dragId: monitor.getItem() ? monitor.getItem().dragId : void 0,
      initialOffset: monitor.getDifferenceFromInitialOffset(),
    };
    return info;
  };

  let draggableShape = class extends React.PureComponent {

    constructor(props) {
      super(props);
    }
    shouldComponentUpdate(nextProps) {

      // discard rendering if we are not dragging it
      if (this.props.dragId != void 0 && this.props._id !== this.props.dragId) {
        return false;
      }
      return nextProps !== this.props;
    }

    // this will be called for EVERY SHAPE, when we drag..
    // but the underlying element will not be rendered everytime
    render() {

      if (this.props.initialOffset && this.props._id === this.props.dragId) {



        let x = !this.props.transform ? 0 : this.props.transform.x;
        let y = !this.props.transform ? 0 : this.props.transform.y;
        x += this.props.initialOffset.x;
        y += this.props.initialOffset.y;

        this.props = {
          ...this.props, transform: {
            x,
            y
          }
        };
      }
      const {dragId, initialOffset, dragging, dispatch, ...passThroughProps} = this.props;
      return (
        <Shape {...passThroughProps}>  </Shape>)
    }
  };
  return  DragSource('SHAPE', shapeSource, collect)(connect()(draggableShape));
}


