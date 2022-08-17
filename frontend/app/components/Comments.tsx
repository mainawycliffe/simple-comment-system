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
  const [isLoading, setIsLoading] = useState(true);

  const envVariables = useLoaderData();

  useEffect(() => {
    async function fetchComments() {
      setIsLoading(true);
      const res = await fetch(`${envVariables.BACKEND_URL}/comments`);
      if (!res.ok) {
        alert('Error fetching comments');
        return;
      }
      const comments = await res.json();
      setComments(comments.data);
      setIsLoading(false);
    }

    fetchComments();
  }, [triggerCommentRefresh, onAddReplyTrigger, envVariables.BACKEND_URL]);

  return (
    <>
      {isLoading ? (
        <div className='text-2xl block text-center p-10 font-bold'>Loading comments...</div>
      ) : (
        <>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onAddReplyTrigger={() => setOnAddReplyTrigger(onAddReplyTrigger + 1)}
            />
          ))}
        </>
      )}
    </>
  );
}
