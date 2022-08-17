import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DateTime } from 'luxon';
import Comment from '../Comment';

const mockComment = {
  id: '1',
  name: 'John Doe',
  photo: 'https://i.pravatar.cc/150?u=johndoe@example.com',
  postedAt: DateTime.now().minus({ minute: 45 }).toISO(),
  comment: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.`,
  upvotes: 15,
  replies: [],
};

test('should show comment content', async () => {
  render(<Comment comment={mockComment} />);

  expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  // avatar
  expect(screen.getByAltText(/john doe/i)).toBeInTheDocument();
});

test('should show reply form when reply is clicked', async () => {
  render(<Comment comment={mockComment} />);

  const replyButton = screen.getByRole('button', { name: /reply/i });
  fireEvent.click(replyButton);

  expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
});

test('should upvote when upvote button is clicked', async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          upvotes: 10,
        }),
    }),
  );

  const callback = jest.fn();

  render(<Comment comment={mockComment} onAddReplyTrigger={callback} />);

  const replyButton = screen.getByRole('button', { name: /upvote/i });
  fireEvent.click(replyButton);

  await waitFor(() => {
    expect(replyButton.textContent).toEqual('15 Upvote');
  });
});
