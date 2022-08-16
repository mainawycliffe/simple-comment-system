import { useForm } from 'react-hook-form';

type FormData = {
  comment: string;
};

type Props = {
  onAddComment?: () => void;
};

export default function AddComment({ onAddComment = () => {} }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('http://localhost:3001/comments', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    if (!res.ok) {
      alert('Error posting comment');
      return;
    }
    reset();
    alert('Comment posted successfully');
    onAddComment();
  };

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row space-x-4'>
        <div className='p-1'>
          <img
            className='w-10 h-10 rounded-full'
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
            alt='avatar'
          />
        </div>
        <div className='flex-1'>
          <input
            aria-label='comment'
            placeholder='What are your thoughts?'
            className='w-full block border border-gray-400 font-semibold rounded-md p-2'
            {...register('comment', {
              required: {
                message: 'Please enter a comment',
                value: true,
              },
            })}
          />
        </div>
        <div>
          <button type='submit' className='px-6 py-2 rounded-md shadow-xl bg-purple-700 text-white block'>
            {isSubmitting ? 'Saving ...' : 'Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}
