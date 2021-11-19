export default interface EditorBlock {
  id: string;
  type: string;
  data: {
    text?: string;
    level?: string;
    style?: string;
    items?: string[];
    file?: {
      url: string;
    };
    caption: string;
    withBorder: boolean;
    stretched: boolean;
    withBackground: boolean;
  };
}
