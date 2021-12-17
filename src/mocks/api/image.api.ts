import { nanoid } from '@reduxjs/toolkit';
import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { FileType } from '../../types';
import { imagesData } from '../db';

export const uploadImage = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const { body } = req;
  const { file, alt } = body as { file: FileType; alt: string };

  return res(
    ctx.delay(3000),
    ctx.status(200),
    ctx.json({ id: nanoid(), alt, url: file?.preview }),
  );
};

export const getImages = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200), ctx.json(imagesData));
};
