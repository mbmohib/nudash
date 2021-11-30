import { DraggableItem } from '.';

export default interface Page {
  siteId: string;
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
