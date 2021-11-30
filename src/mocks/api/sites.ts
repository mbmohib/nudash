import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { Site } from '../../types';
import { siteData } from '../db/site';

// eslint-disable-next-line import/prefer-default-export
export const UpdateSite = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const { body } = req;

  const data = {
    ...siteData,
    ...(body as Site),
  };

  return res(ctx.status(200), ctx.json({ data }));
};

export const getSite = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200), ctx.json(siteData));
};
