import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

const AvatarWrapper = styled(Avatar)`
  && {
    width: ${props => props.size + 'px'};
    height: ${props => props.size + 'px'};
  }
`;

const AvatarExtended = ({ src, name, size = 60, ...rest }) => (
  <AvatarWrapper src={src} size={size} alt={name} {...rest}>
    {name.charAt(0)}
  </AvatarWrapper>
);

AvatarExtended.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default AvatarExtended;
