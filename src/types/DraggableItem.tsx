import { FieldType } from '../config';

export default interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: any;
}
