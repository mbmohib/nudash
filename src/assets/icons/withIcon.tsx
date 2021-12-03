import { Component } from 'react';

import { IconTypes } from '../../types';

function chakraColorToCSSVariable(theme = '') {
  const token = theme.split('.').join('-');
  return `var(--chakra-colors-${token})`;
}

export default function withIcon<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>,
) {
  return class extends Component<T & IconTypes> {
    render() {
      const { fill, ...props } = this.props;
      const fillColor = fill ? chakraColorToCSSVariable(fill) : 'currentColor';

      return <WrappedComponent fill={fillColor} {...(props as T)} />;
    }
  };
}
