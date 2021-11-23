export default interface Site {
  id: string;
  name: string;
  url?: string;
  tagline?: string;
  description?: string;
  logo?: string;
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
