import React from 'react'
import {Circle} from './Circle'
import {updateCircleAction} from './shapesReducers';
import {connect} from 'react-redux'


let defaultStyle = {
  fill: 'red',
  outerR: 10,
  innerR: 5
};

const Handle = (props) => {
  // we can remove this extracting logic

  const {connectDragHandle, ...p } = props;

  let c1 = {
    cx: p.x,
    cy: p.y,
    fillOpacity: 0.2,
    r: defaultStyle.outerR,
    fill: defaultStyle.fill
  }, c2 = {
    cx: p.x,
    cy: p.y,
    fillOpacity: 0.5,
    r: defaultStyle.innerR,
    fill: defaultStyle.fill
  };

  return (connectDragHandle(<g>
    <circle {...c1}/>
    <circle {...c2}/>
  </g>));
};


/*
function draggableHandle(Shape) {

  let DraggableHandle = class extends React.PureComponent {

    constructor(props) {
      super(props);
    }

    render() {
      if (this.props.targetShape == this.props.draggedId && this.props.dragging) {
        // we are dragging and need to calculate the new point
        let {x, y, ...otherProps} = this.props;
        x = x + this.props.offset.x;
        y = y + this.props.offset.y;
        otherProps.x = x;
        otherProps.y = y;
        const x1 = this.props.shapeSvgAttributes.cx;
        const y1 = this.props.shapeSvgAttributes.cy;
        const x2 = x;
        const y2 = y;
        let r = Math.hypot(x2 - x1, y2 - y1);
        const svgAttrs = {
          cx: this.props.shapeSvgAttributes.cx,
          cy: this.props.shapeSvgAttributes.cy,
          r: r
        };


        this.props.onDrag(svgAttrs);

        return (<Shape {...otherProps}></Shape>);

      }
      return (<Shape {...this.props}></Shape>);
    }

  };

  const mapStateToProps = (state, ownProps) => {
    let shape = state.scene.circles.byIds[ownProps.targetShape];
    return {
      shapeSvgAttributes: shape.svgAttributes
    }
  };

  return  (connect(mapStateToProps)(DraggableHandle));
}
*/

export default Handle;
