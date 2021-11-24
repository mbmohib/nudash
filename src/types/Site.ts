export default interface Site {
  id: string;
  name?: string;
  url?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  menus?: {
    label: string;
    url: string;
    isOpenNew: boolean;
  }[];
  pages?: {
    id: string;
    name: string;
    path: string;
  }[];
}
