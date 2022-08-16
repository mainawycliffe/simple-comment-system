import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddComment from '../AddComment';

test('should show search form and search on click search', async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
    }),
  );

  const callback = jest.fn();

  render(<AddComment onAddComment={callback} />);

  const commentInput = screen.getByLabelText(/comment/i);
  expect(commentInput).toHaveValue('');
  fireEvent.change(commentInput, { target: { value: 'Some comment' } });
  expect(commentInput).toHaveValue('Some comment');

  const commentButton = screen.getByRole('button', { name: /comment/i });
  fireEvent.click(commentButton);

  await waitFor(() => {
    expect(callback).toHaveBeenCalled();
  });
});
