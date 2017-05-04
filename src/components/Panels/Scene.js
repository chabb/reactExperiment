import React from 'react'
import {Circle} from '../Shapes/Circle'
import {Square} from '../Shapes/Square'
import {Line} from '../Shapes/Line'
import {withStyle} from '../Shapes/styleShapeDecorator';
import managedShape from '../Shapes/ManagedShape';
import {connect} from 'react-redux'
import { DragDropContext } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import draggableShape from '../Shapes/draggableShape';
import selectableShape from '../Shapes/selectableShape';


const SLine =  managedShape(draggableShape(selectableShape(withStyle(Line), 2,

  (props) => {
    const x1 = props.svgAttributes.x1 + (props.transform ? props.transform.x : 0);
    const y1 = props.svgAttributes.y1 + (props.transform ? props.transform.y : 0);
    const x2 = props.svgAttributes.x2 + (props.transform ? props.transform.x : 0);
    const y2 = props.svgAttributes.y2 + (props.transform ? props.transform.y : 0);
    return [{x: x1, y:y1}, {x: x2, y: y2}];
  },
  (props, passedProps, handles) => {
    let handle = passedProps.handle;
    //REFACTOR THAT
    let svg = document.querySelector('svg');
    let pt = svg.createSVGPoint(); // demo is an SVGElement
    let x2 = 0 + props.offset.x;
    let y2 = 0 + props.offset.y;
    pt.x = x2;
    pt.y = y2;
    let svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    if (handle === 0) {
      passedProps.svgAttributes.x1 = svgPt.x;
      passedProps.svgAttributes.y1 = svgPt.y;
    } else {
      passedProps.svgAttributes.x2 = svgPt.x;
      passedProps.svgAttributes.y2 = svgPt.y;
    }
  })), 'lines');

const SCircle = managedShape(draggableShape(selectableShape(withStyle(Circle), 4,
  (props) => {
    const x = props.svgAttributes.cx + (props.transform ? props.transform.x : 0);
    const y = props.svgAttributes.cy + (props.transform ? props.transform.y : 0);
    const r = props.svgAttributes.r;
    return [
      {x: x - r, y: y - r},
      {x: x + r, y: y - r},
      {x: x + r, y: y + r},
      {x: x - r, y: y + r}
    ];
  },
  (props, passedProps) => {
    let svg = document.querySelector('svg');
    let pt = svg.createSVGPoint(); // demo is an SVGElement
    let x2 = 0 + props.offset.x;
    let y2 = 0 + props.offset.y;
    pt.x = x2;
    pt.y = y2;
    let svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

    const tx = props.transform ? props.transform.x : 0;
    const ty = props.transform ? props.transform.y : 0;
    const x1 = props.svgAttributes.cx + tx;
    const y1 = props.svgAttributes.cy + ty;
    let r = Math.hypot(svgPt.x - x1, svgPt.y - y1);
    passedProps.svgAttributes.r = r;
    return passedProps
  }
)), 'circles');
const SSquare = managedShape(draggableShape(selectableShape(withStyle(Square), 4,
  (props) => {

    const x = props.svgAttributes.x + (props.transform ? props.transform.x : 0);
    const y = props.svgAttributes.y + (props.transform ? props.transform.y : 0);
    const w = props.svgAttributes.width;
    const h = props.svgAttributes.height;
    return [
      {x: x , y: y},
      {x: x + w, y: y},
      {x: x + w, y: y + h},
      {x: x, y: y + h}
    ];
  }, (props, passedProps, handles) => {


    let handle = passedProps.handle;
    let svg = document.querySelector('svg');
    let pt = svg.createSVGPoint(); // demo is an SVGElement
    let x2 = 0 + props.offset.x;
    let y2 = 0 + props.offset.y;
    pt.x = x2;
    pt.y = y2;
    let svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

    let tx = props.svgAttributes.x + (props.transform ? props.transform.x : 0);
    let ty = props.svgAttributes.y + (props.transform ? props.transform.y : 0);
    if (handle === 0) {
      let delta = tx - svgPt.x;
      passedProps.svgAttributes.x = props.svgAttributes.x - delta;
      passedProps.svgAttributes.width =  passedProps.svgAttributes.width + delta;

      delta = ty - svgPt.y;
      passedProps.svgAttributes.y = props.svgAttributes.y - delta;
      passedProps.svgAttributes.height =  passedProps.svgAttributes.height + delta;

    }
    if (handle == 2) {
      const cornerX = tx + passedProps.svgAttributes.width;
      const cornerY = ty + passedProps.svgAttributes.height;

      let delta = cornerX - svgPt.x;
      passedProps.svgAttributes.width =  passedProps.svgAttributes.width - delta;
      delta = cornerY - svgPt.y;
      passedProps.svgAttributes.height =  passedProps.svgAttributes.height - delta;
    }

    if (handle == 1) {
      const cornerX = tx + passedProps.svgAttributes.width;
      const cornerY = ty;
      let delta = cornerX - svgPt.x;
      passedProps.svgAttributes.width =  passedProps.svgAttributes.width - delta;
      delta = cornerY - svgPt.y;
      passedProps.svgAttributes.y = props.svgAttributes.y - delta;
      passedProps.svgAttributes.height =  passedProps.svgAttributes.height + delta;
    }

    if (handle == 3) {
      const cornerX = tx;
      const cornerY = ty + passedProps.svgAttributes.height;
      let delta = cornerX - svgPt.x;
      passedProps.svgAttributes.x = props.svgAttributes.x - delta;
      passedProps.svgAttributes.width =  passedProps.svgAttributes.width + delta;
      delta = cornerY - svgPt.y;
      passedProps.svgAttributes.height =  passedProps.svgAttributes.height - delta;
    }
  }
)), 'squares');

let UIScene = ({circles = [], squares = [], beziers = [], lines = [], groups = []}) => {



    function handleClick() {
      // grab mouse coordinates

      // add shape

      // now we want to have drag interaction on this shape
    }


    return (<svg onClick={handleClick}>
      //we might use a shape group
      <g id='scene'>
        {
          circles.map(
            c => <SCircle
              _id={c.id}
              key={c.id}/>
          )
        }
        {
          squares.map(
            c => <SSquare
              _id={c.id}
              key={c.id}/>
          )
        }
        {
          lines.map(
            c => <SLine _id={c.id} key={c.id}/>
          )
        }


      </g>
    </svg>
  );
};

UIScene = DragDropContext(MouseBackEnd)(UIScene);

const mapStateToProps  = (state) => {

  return {
    circles: Object.values(state.scene.circles.byIds),
    squares: Object.values(state.scene.squares.byIds),
    lines: Object.values(state.scene.lines.byIds),
  }
};

export const SceneContainer = connect(mapStateToProps)(UIScene);



// ok, i use the draggable stuff
// a better alternative would be to have an active tool ?
// we make 


