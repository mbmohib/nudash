import React from 'react';
import styled, { css } from 'styled-components';
import { spacing, sizing, borders } from '@material-ui/system';

const Img = styled.img`
  ${props =>
    props.center &&
    css`
      margin: 0 auto;
      display: block;
    `};

  ${spacing};
  ${sizing};
  ${borders};
`;

const Image = ({ src, alt, center, ...rest }) => {
  return <Img src={src} alt={alt} center={center} {...rest} />;
};

export default Image;
