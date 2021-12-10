export interface SiteMenu {
  id: string;
  label: string;
  url: string;
  isOpenNew: boolean;
}

export interface Site {
  id: string;
  name?: string;
  url?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  menus?: SiteMenu[];
}
