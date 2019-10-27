import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { spacing } from '@material-ui/system';

const Menu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  ${spacing};
`;

const MenuItem = styled.li``;
const MenuItemLink = styled(Link)`
  padding: 0 10px;
  color: ${({ color, theme }) =>
    color ? theme.palette[color].main : theme.palette.text.primary};
`;

const Menus = ({ items, color, ...rest }) => {
  return (
    <Menu {...rest}>
      {items.map(({ label, link }) => (
        <MenuItem key={label}>
          <MenuItemLink to={link} color={color}>
            {label}
          </MenuItemLink>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Menus;
