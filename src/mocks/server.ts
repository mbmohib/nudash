import { setupServer } from 'msw/node';

import { db } from './db/site';

const handlers = [...db.site.toHandlers('rest')];

export default setupServer(...handlers);
