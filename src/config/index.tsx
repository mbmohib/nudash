export enum ActionType {
  Add = 'add',
  Delete = 'delete',
  Drag = 'drag',
  Open = 'open',
  Modify = 'modify',
}

export enum FieldType {
  Column = 'column',
  Text = 'text',
  MultilineText = 'multilineText',
  RichText = 'richText',
  Image = 'image',
  Icon = 'icon',
  Number = 'number',
  Date = 'date',
  Switch = 'switch',
  Button = 'button',
  Link = 'link',
}

export const ItemTypes = {
  Field: 'field',
  Column: 'column',
  Section: 'section',
  Menu: 'menu',
};

export const maxImageSize = 3 * 1024 * 1024;
export const apiEndpoint = process.env.REACT_APP_API;

export const siteMenus = [
  {
    id: '001',
    name: 'Meta Data',
    path: '/site/meta-data',
  },
  {
    id: '002',
    name: 'Menus',
    path: '/site/menus',
  },
  {
    id: '003',
    name: 'Settings',
    path: '/site/settings',
  },
  {
    id: '004',
    name: 'SEO',
    path: '/site/seo',
  },
];

export const dashboardMenus = [
  {
    id: '001',
    name: 'Analytics',
    path: '/dashboard/analytics',
  },
];

export const galleryMenus = [
  {
    id: '001',
    name: 'Images',
    path: '/gallery/images',
  },
  {
    id: '002',
    name: 'Icons',
    path: '/gallery/icons',
  },
];
