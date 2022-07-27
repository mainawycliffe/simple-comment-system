import ShortUniqueId from 'short-unique-id';
import { DateTime } from 'luxon';

export const comments = [];

export function initialComments() {
  const uid = new ShortUniqueId({ length: 10 });

  const initialComments = [
    {
      id: uid(),
      name: 'John Doe',
      photo: 'https://i.pravatar.cc/150?u=johndoe@example.com',
      postedAt: DateTime.now().minus({ minute: 45 }).toISO(),
      comment: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.`,
      upvotes: 15,
    },
    {
      id: uid(),
      name: 'Jane Doe',
      photo: 'https://i.pravatar.cc/150?u=janedoe@example.com',
      postedAt: DateTime.now().minus({ minute: 13 }).toISO(),
      comment: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      upvotes: 17,
    },
    {
      id: uid(),
      name: 'Maina Wycliffe',
      photo: 'https://i.pravatar.cc/150?u=mainawycliffe@example.com',
      postedAt: DateTime.now().minus({ minute: 5 }).toISO(),
      comment: `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      upvotes: 5,
    },
  ];

  comments.push(...initialComments);
}

export function getComments() {
  if (comments.length === 0) {
    initialComments();
  }
  return comments;
}

export function addComment(comment) {
  comments.push(comment);
}
