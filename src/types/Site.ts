export default interface Site {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  menus?: {
    label: string;
    url: string;
  }[];
  pages?: {
    id: string;
    name: string;
    path: string;
  }[];
}
