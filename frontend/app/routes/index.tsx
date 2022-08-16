import Comments from '~/components/Comments';
import AddComment from '~/components/AddComment';

export default function Index() {
  return (
    <div className='h-screen w-screen mx-auto bg-gray-200'>
      <div className='flex flex-col w-full md:w-[80rem] mx-auto p-5 space-y-8 divide-y divide-solid'>
        <h3 className='text-3xl font-bold'>Discussion</h3>

        <AddComment onAddComment={() => {}} />

        <div className='flex flex-col w-full border-top border-gray-400'> </div>

        <div id='comments' className='flex flex-col w-full space-y-8'></div>

        <Comments />
      </div>
    </div>
  );
}
