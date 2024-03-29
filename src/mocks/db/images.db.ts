import { build, fake, oneOf, sequence } from '@jackfranklin/test-data-bot';
import { nanoid } from 'nanoid';

import { Image } from '../../types';

const imgLinks = [
  'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ',
  'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
  'https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g',
  'https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g',
  'https://i.picsum.photos/id/1002/4312/2868.jpg?hmac=5LlLE-NY9oMnmIQp7ms6IfdvSUQOzP_O3DPMWmyNxwo',
  'https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs',
];

const iconLinks = [
  'https://freesvg.org/img/1538298822.png',
  'https://freesvg.org/img/jean-victor-balin-icon-cubes.png',
  'https://freesvg.org/img/refresh-icon.png',
];

export const imageBuilder = build('Image', {
  fields: {
    id: sequence(x => nanoid() + x),
    alt: fake(f => f.lorem.words()),
    url: oneOf(...imgLinks),
  },
});

export const iconBuilder = build('Image', {
  fields: {
    id: sequence(x => nanoid() + x),
    alt: fake(f => f.lorem.words()),
    url: '',
  },
});

export const imageData = imageBuilder() as Image;
export const imagesData = [
  imageBuilder(),
  imageBuilder(),
  imageBuilder(),
  imageBuilder(),
] as Image[];

export const iconData = iconBuilder() as Image;
export const iconsData = [
  iconBuilder({
    overrides: {
      url: iconLinks[0],
    },
  }),
  iconBuilder({
    overrides: {
      url: iconLinks[1],
    },
  }),
  iconBuilder({
    overrides: {
      url: iconLinks[2],
    },
  }),
] as Image[];
