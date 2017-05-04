import React from 'react'

export function withStyle(WrappedComponent) {
  return class extends React.PureComponent {

    constructor(props) {
      super(props);
    }

    // the issue is that this guy will be re-rendered, as new props are injected

    render() {
      if (this.props.transform) {
        this.props = {...this.props, transform:`translate(${this.props.transform.x}, ${this.props.transform.y})`}
      } else {
        this.props = {...this.props, transform:'translate(0, 0)'};
      }
      let props = {
        ...this.props.svgAttributes,
        ...this.props.style,
        onClick: this.props.onClick,
        transform: this.props.transform,
        connectDragSource: this.props.connectDragSource
      };

      return React.createElement(WrappedComponent, props, null);
    }
  }
}

