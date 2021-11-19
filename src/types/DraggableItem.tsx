import { FieldData } from '.';
import { FieldType } from '../config';

export default interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: FieldData;
  handlerId?: string;
}
