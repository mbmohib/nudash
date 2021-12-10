import { FieldType } from '../config';
import FieldData from './FieldData';

export default interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: FieldData;
  handlerId?: string;
}
