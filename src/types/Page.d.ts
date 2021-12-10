import { FieldType } from '../config';
import EditorBlock from './EditorBlock';

export interface DraggableField {
  type: FieldType;
  info: {
    title: string;
    icon: React.ReactNode;
  };
}

export interface FieldData {
  label?: string;
  blocks?: EditorBlock;
  value: string | number | boolean | Date;
}

export interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: FieldData;
  handlerId?: string;
}

export interface Rows {
  id: number;
  columns: DraggableItem[][];
}

export interface Sections {
  id: string;
  rows: Rows[];
}

export interface Page {
  siteId: string;
  pageId: string;
  name: string;
  path: string;
  sections: Sections[];
}

export interface Pages {
  id: string;
  name: string;
  path: string;
}
