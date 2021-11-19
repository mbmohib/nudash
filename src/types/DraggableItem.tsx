import { EditorBlock } from '.';
import { FieldType } from '../config';

export default interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: {
    [key: string]: string | number | boolean | Date | EditorBlock;
  };
  handlerId?: string;
}
