import { build, fake } from '@jackfranklin/test-data-bot';

import { Auth, User } from '../../types';

export const authBuilder = build('Auth', {
  fields: {
    user: {
      email: fake(f => f.internet.email()),
    },
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImlhdCI6MTY0MTE5NzE0MX0.uhJ8T1Xh1AKbL81ibF1kAHeuVh8DXs4ZMVqoNhXeKUo',
  },
});

export const loginBuilder = build('User', {
  fields: {
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
  },
});

export const authData = authBuilder() as Auth;
export const loginData = loginBuilder() as User;
