import { useEffect, useState } from 'react';
import type { CommentData } from './Comment';
import Comment from './Comment';

type Props = {
  triggerCommentRefresh: number;
};

export default function Comments({ triggerCommentRefresh }: Props) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [onAddReplyTrigger, setOnAddReplyTrigger] = useState<number>(0);

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch('http://localhost:3001/comments');
      if (!res.ok) {
        alert('Error fetching comments');
        return;
      }
      const comments = await res.json();
      setComments(comments.data);
    }

    fetchComments();
  }, [triggerCommentRefresh, onAddReplyTrigger]);

  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onAddReplyTrigger={() => setOnAddReplyTrigger(onAddReplyTrigger + 1)}
        />
      ))}
    </>
  );
}
