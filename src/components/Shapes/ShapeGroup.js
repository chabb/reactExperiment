import React from 'react'
import {Square} from './Square'
import {Circle} from './Circle'

export const ShapesGroup = () => {

  let circles = this.circles.map((circle) =>
    <Circle key={circle.id}/>
  );

  let squares = this.rects.map((rect) =>
    <Square key={rect.id}/>
  );

  let groups = this.groups.map((group) =>
    <ShapesGroup key={group.id}/>
  );

};

