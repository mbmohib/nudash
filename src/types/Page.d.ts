import { FieldType } from '../config';

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

export interface Row {
  id: number;
  columns: DraggableItem[][];
}

export interface Section {
  id: string;
  rows: Row[];
}

export interface Page {
  siteId: string;
  pageId: string;
  name: string;
  path: string;
  sections: Section[];
}

export interface Pages {
  id: string;
  name: string;
  path: string;
}
