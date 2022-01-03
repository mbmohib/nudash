import { SVGProps } from 'react';
import { Location as LocationType } from 'react-router-dom';

import { colors } from '../styles/theme';

interface Config {
  fill?: keyof typeof colors;
  width?: number;
  height?: number;
}

export type IconTypes = Omit<SVGProps<SVGSVGElement>, keyof Config> & Config;

export interface FileType extends File {
  preview: string;
}

export interface EditorBlock {
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

export interface Location extends LocationType {
  state: {
    from: { pathname: string };
  };
}
