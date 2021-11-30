import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { Site } from '../../types';
import { siteData } from '../db/site';

export const updateSite = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const { body } = req;

  const data = {
    ...siteData,
    ...(body as Site),
  };

  return res(ctx.status(200), ctx.json(data));
};

export const getSite = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200), ctx.json(siteData));
};

export const siteFailed = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(
    ctx.status(500),
    ctx.json({ data: { error: 'Internal server error' } }),
  );
};
