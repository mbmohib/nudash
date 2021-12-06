import { SVGProps } from 'react';

import { colors } from '../styles/theme';

interface Config {
  fill?: keyof typeof colors;
  width?: number;
  height?: number;
}

type IconTypes = Omit<SVGProps<SVGSVGElement>, keyof Config> & Config;

export default IconTypes;