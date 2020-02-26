import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

const items = [
  {
    label: 'Subtitle',
    value: 'subtitle',
  },
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'Link',
    value: 'link',
  },
  {
    label: 'Collections',
    value: 'collections',
  },
];

const SiteSectionFormMenu = ({ anchorEl, handleMenu }) => {
  return (
    <Menu
      id="section-form-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenu}
    >
      {items.map(item => (
        <MenuItem key={item.value} onClick={() => handleMenu(item.value)}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default SiteSectionFormMenu;
