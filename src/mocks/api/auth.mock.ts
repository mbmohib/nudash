import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { authData } from '../db';

export const login = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200), ctx.json({ data: authData }));
};

export const refreshToken = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(
    ctx.status(401),
    ctx.json({
      message: 'User not authenticated',
    }),
  );
};

export const logout = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => {
  return res(ctx.status(200), ctx.json({ data: null }));
};
