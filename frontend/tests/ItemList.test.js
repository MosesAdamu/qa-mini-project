import { render, screen } from '@testing-library/react';
import ItemList from '../src/components/Items/ItemList';

test('renders item list', async () => {
  render(<ItemList />);
  const heading = screen.getByText(/Items/i);
  expect(heading).toBeInTheDocument();
});
