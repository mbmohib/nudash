import React from 'react';
import { Wrapper } from '../../ui';

const SocialIcons = ({ icons = [] }) => {
  return (
    <Wrapper>
      {icons.map((icon, index) => (
        <a href={icon.link} key={index}>
          {icon.image}
        </a>
      ))}
    </Wrapper>
  );
};

export default SocialIcons;
