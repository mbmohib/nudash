import { DraggableItem } from '.';

export default interface Section {
  pageId: string;
  name: string;
  path: string;
  sections: {
    id: number;
    rows: {
      id: number;
      columns: DraggableItem[][];
    }[];
  }[];
}
