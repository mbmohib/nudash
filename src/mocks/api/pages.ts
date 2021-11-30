import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { Page, Pages } from '../../types';
import { pageData, pagesData } from '../db/page';

export const getPages = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200), ctx.json(pagesData));
};

export const getPage = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200), ctx.json(pageData));
};

export const addPage = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const body = req.body as { name: string; path: string };

  const data = [
    // ...pagesData,
    [
      {
        id: '002',
        name: body.name,
        path: body.path,
      },
    ],
  ];

  return res(ctx.status(200), ctx.json(data));
};

export const updatePage = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  const body = req.body as Page;

  const data = {
    ...pageData,
    ...body,
  };

  return res(ctx.status(200), ctx.json(data));
};
