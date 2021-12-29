import { screen } from '@testing-library/react';
import mockConsole from 'jest-mock-console';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SiteNav } from '..';
import { server } from '../../mocks/server';
import { render, userEvent } from '../../utils/test';

let restoreConsole: { (): void; (): void };

const fakeMenu = {
  label: 'Fake Label',
  url: 'https://fake.com',
  isOpenNew: true,
};

beforeAll(() => {
  restoreConsole = mockConsole('error');
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
  restoreConsole();
});
afterEach(() => server.resetHandlers());

function RenderSiteNav() {
  return render(
    <DndProvider backend={HTML5Backend}>
      <SiteNav />
    </DndProvider>,
  );
}

test('renders a nav form and add menu', async () => {
  RenderSiteNav();

  const addBtn = screen.getByLabelText('add menu');
  userEvent.click(addBtn);

  expect(screen.getAllByLabelText(/label/i)).toHaveLength(1);
});

test('renders a nav form and  update menu', async () => {
  RenderSiteNav();
  const { getByText, getByLabelText } = screen;

  const label = getByLabelText(/label/i);
  userEvent.clear(label);
  userEvent.type(label, fakeMenu.label);
  expect(label).toHaveValue(fakeMenu.label);

  const url = getByLabelText(/url/i);
  userEvent.clear(url);
  userEvent.type(url, fakeMenu.url);
  expect(url).toHaveValue(fakeMenu.url);

  const newToggleBtn = getByLabelText(/new/i);
  userEvent.clear(newToggleBtn);
  userEvent.click(newToggleBtn);
  expect(newToggleBtn).toBeChecked();

  const saveBtn = getByText(/save/i);
  userEvent.click(saveBtn);
});

test('renders a nav form and  delete menu', async () => {
  RenderSiteNav();
  const { getByText, queryAllByLabelText } = screen;

  const deleteBtn = getByText(/delete/i);
  userEvent.click(deleteBtn);
  expect(queryAllByLabelText(/label/i)).toHaveLength(0);
});
