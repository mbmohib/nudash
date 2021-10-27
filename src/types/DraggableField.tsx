import { FieldType } from '../config';

export default interface DraggableField {
  type: FieldType;
  info: {
    title: string;
    icon: React.ReactNode;
  };
}
