import ShortUniqueId from 'short-unique-id';
import { DateTime } from 'luxon';

export const comments = [];

export function initialComments() {
  const uid = new ShortUniqueId({ length: 10 });
  const firstItemID = uid();
  const secondItemID = uid();
  const initialCommentList = [
    {
      id: firstItemID,
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
    },
    {
      id: uid(),
      name: 'Jane Doe',
      photo: 'https://i.pravatar.cc/150?u=janedoe@example.com',
      postedAt: DateTime.now().minus({ hour: 3 }).toISO(),
      comment:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      upvotes: 17,
      replyTo: firstItemID,
    },
    {
      id: secondItemID,
      name: 'Maina Wycliffe',
      photo: 'https://i.pravatar.cc/150?u=mainawycliffe@example.com',
      postedAt: DateTime.now().minus({ day: 5 }).toISO(),
      comment:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      upvotes: 5,
      replies: [],
    },
    {
      id: uid(),
      name: 'Jane Doe',
      photo: 'https://i.pravatar.cc/150?u=janedoe@example.com',
      postedAt: DateTime.now().minus({ hour: 3 }).toISO(),
      comment:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      upvotes: 17,
      replyTo: secondItemID,
    },
  ];

  comments.push(...initialCommentList);
}

export function getComments() {
  if (comments.length === 0) {
    initialComments();
  }
  const allComments = JSON.parse(JSON.stringify(comments));
  const responseComments = [];

  // nest replied
  allComments.forEach((comment) => {
    if (comment.replyTo) {
      console.log(comment);
      const repliedComment = responseComments.find((c) => c.id === comment.replyTo);
      repliedComment.replies.push(comment);
    } else {
      responseComments.push(comment);
    }
  });
  console.log(JSON.stringify(responseComments, null, 2));
  return responseComments;
}

export function addComment(comment, replyForID) {
  const uid = new ShortUniqueId({ length: 10 });
  const commentObj = {
    id: uid(),
    name: 'Barack Obama',
    photo: 'https://i.pravatar.cc/150?u=obama@example.com',
    postedAt: DateTime.now().toISO(),
    comment,
    upvotes: 1,
    replyTo: replyForID,
  };
  comments.push(commentObj);
  return commentObj;
}

export function upvoteComment(commentID) {
  const comment = comments.find((comment) => comment.id === commentID);
  if (!comment) {
    return;
  }
  comment.upvotes += 1;
  return comment;
}
