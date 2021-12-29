import { nanoid } from '@reduxjs/toolkit';
import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { FileType } from '../../types';
import { iconsData, imagesData } from '../db';

export const uploadImage = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const { body } = req;
  const { alt } = body as { file: FileType; alt: string };

  return res(
    ctx.delay(3000),
    ctx.status(200),
    ctx.json({ id: nanoid(), alt, url: imagesData[0].url }),
  );
};

export const updateImage = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const { body } = req || {};
  const { id } = req.params;
  const { alt } = body as { alt: string };

  const image = imagesData.find(item => item.id === id);

  return res(ctx.status(200), ctx.json({ ...image, alt }));
};

export const getImages = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const type = req.url.searchParams.get('type');

  return res(
    ctx.status(200),
    ctx.json(type === 'icon' ? iconsData : imagesData),
  );
};

export const deleteImage = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200));
};
