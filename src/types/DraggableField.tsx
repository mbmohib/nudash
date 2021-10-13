import { FieldType } from './FieldType';

export interface DraggableField {
  type: FieldType;
  info: {
    title: string;
    subtitle: string;
  };
}
