import { EditorBlock } from '.';

export default interface FieldData {
  label?: string;
  blocks?: EditorBlock;
  value: string | number | boolean | Date;
}
