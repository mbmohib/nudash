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
export const apiEndpoint = '/';
