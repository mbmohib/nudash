import { SiteMenu } from '.';

export default interface Site {
  id: string;
  name?: string;
  url?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  menus?: SiteMenu[];
}
