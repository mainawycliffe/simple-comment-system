import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

export default function Comments() {
  const [comments, setComments] = useState<Record<string, string>[]>([]);

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
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <>
          <div className='flex flex-col w-full space-y-8'>
            <div className='flex flex-row space-x-4'>
              <div className='p-1'>
                <img className='w-10 h-10 rounded-full' src={comment.photo} alt='avatar' />
              </div>
              <div className='flex flex-col space-y-2 flex-1'>
                <div className='block'>
                  <div className='inline-block text-lg font-bold'>{comment.name}</div>
                  <div className='inline-block text-gray-500 px-1'>&#8226;</div>
                  <div className='inline-block text-gray-500'>{DateTime.fromISO(comment.postedAt).toRelative()}</div>
                </div>
                <div className='block'>{comment.comment}</div>
                <div className='block font-semibold'>
                  <button type='button' className='inline-block'>
                    <span className='inline-block align-middle'>
                      <svg className='h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                        <path d='M9.39 265.4l127.1-128C143.6 131.1 151.8 128 160 128s16.38 3.125 22.63 9.375l127.1 128c9.156 9.156 11.9 22.91 6.943 34.88S300.9 320 287.1 320H32.01c-12.94 0-24.62-7.781-29.58-19.75S.2333 274.5 9.39 265.4z'></path>
                      </svg>
                    </span>
                    <span className='mr-4 inline-block hover:underline'>Upvote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
