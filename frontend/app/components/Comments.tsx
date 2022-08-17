import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import type { CommentData } from './Comment';
import Comment from './Comment';

type Props = {
  triggerCommentRefresh: number;
};

export default function Comments({ triggerCommentRefresh }: Props) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [onAddReplyTrigger, setOnAddReplyTrigger] = useState<number>(0);
  const envVariables = useLoaderData();
  console.log({ envVariables });

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`${envVariables.BACKEND_URL}/comments`);
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
