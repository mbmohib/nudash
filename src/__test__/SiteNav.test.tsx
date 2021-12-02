import mockConsole from 'jest-mock-console';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SiteNav } from '../components';
import { siteBuilder } from '../mocks/db/site';
import { server } from '../mocks/server';
import { Site } from '../types';
import { render } from '../utils/test';

let restoreConsole: { (): void; (): void };

beforeAll(() => {
  restoreConsole = mockConsole();
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
  restoreConsole();
});
afterEach(() => server.resetHandlers());
const fakeSiteData = siteBuilder() as Site;

function renderSiteData() {
  const utils = render(
    <DndProvider backend={HTML5Backend}>
      <SiteNav menus={fakeSiteData.menus} />
    </DndProvider>,
  );

  return {
    ...utils,
  };
}

test('renders a nav form and update data', async () => {
  const { getByLabelText } = renderSiteData();

  getByLabelText(/label/i);
});
