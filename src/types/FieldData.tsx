import EditorBlock from './EditorBlock';

export default interface FieldData {
  label?: string;
  blocks?: EditorBlock;
  value: string | number | boolean | Date;
}
