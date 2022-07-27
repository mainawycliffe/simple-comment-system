import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../Search';

test('should show search form and search on click search', async () => {
  render(<Search />);

  const commentInput = screen.getByLabelText(/comment/i);
  expect(commentInput).toHaveValue('');
  fireEvent.change(commentInput, { target: { value: 'Some comment' } });
  expect(commentInput).toHaveValue('Some comment');
});
