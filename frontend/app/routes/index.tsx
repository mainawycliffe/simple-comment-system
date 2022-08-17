import Comments from '~/components/Comments';
import AddComment from '~/components/AddComment';
import { useState } from 'react';
import { json } from '@remix-run/node';

export async function loader() {
  return json({
    BACKEND_URL: process.env.BACKEND_URL,
  });
}

export default function Index() {
  const [refreshComments, setRefreshComments] = useState<number>(0);

  const onAddNewComment = () => {
    setRefreshComments(refreshComments + 1);
  };

  return (
    <div className='h-screen w-screen mx-auto bg-gray-200'>
      <div className='flex flex-col w-full md:w-[80rem] mx-auto p-5 space-y-8 divide-y divide-solid'>
        <h3 className='text-3xl font-bold'>Discussion</h3>

        <AddComment onAddComment={onAddNewComment} />

        <div className='flex flex-col w-full border-top border-gray-400'> </div>

        <div id='comments' className='flex flex-col w-full space-y-8'></div>

        <Comments triggerCommentRefresh={refreshComments} />
      </div>
    </div>
  );
}
