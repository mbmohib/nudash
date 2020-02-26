import React from 'react';

function withSVG(WrappedComponent, config = {}) {
  return class extends React.Component {
    render() {
      const style = this.props.style || config.style || {};
      const fill = this.props.fill || config.fill || '';
      const width = this.props.size || config.size || '24';
      const height = this.props.size || config.size || '24';
      const className = this.props.fill || config.className || '';
      const viewBox = this.props.viewBox || config.viewBox || '0 0 24 24';

      return (
        <svg
          width={width}
          height={height}
          style={style}
          viewBox={viewBox}
          fill={fill}
          className={`svg-icon ${className || ''}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <WrappedComponent />
        </svg>
      );
    }
  };
}

export default withSVG;
