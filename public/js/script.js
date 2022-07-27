function addComment(comment) {
  const commentELement = document.createElement('div');
  commentELement.classList.add('flex', 'flex-row', 'space-x-4');
  commentELement.innerHTML = `
  <div class='p-1'>
        <img class='w-10 h-10 rounded-full' src='${comment.photo}' alt='avatar' />
      </div>
      <div class='flex flex-col space-y-2 flex-1'>
        <div class='block'>
          <div class='inline-block text-lg font-bold'>${comment.name}</div>
          <div class='inline-block text-gray-500 px-1'>&#8226;</div>
          <div class='inline-block text-gray-500'>${luxon.DateTime.fromISO(comment.postedAt).toRelative()}</div>
        </div>
        <div class='block'>${comment.comment}</div>
        <div class='block font-semibold'> 
          <button class='inline-block'>
            <span class='inline-block align-middle'>
              <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                <path d='M9.39 265.4l127.1-128C143.6 131.1 151.8 128 160 128s16.38 3.125 22.63 9.375l127.1 128c9.156 9.156 11.9 22.91 6.943 34.88S300.9 320 287.1 320H32.01c-12.94 0-24.62-7.781-29.58-19.75S.2333 274.5 9.39 265.4z'></path>
              </svg>
            </span>
            <span class='mr-4 inline-block hover:underline'>Upvote</span>
          </button>
        </div>
      </div>`;
  const commentContainer = document.getElementById('comments');
  commentContainer.append(commentELement);
}

window.addEventListener('load', async () => {
  /* load comments on load */
  const res = await fetch('/comments', {
    method: 'GET',
  });
  const body = await res.json();
  body.data.forEach((comment) => {
    addComment(comment);
  });
});

async function handleSubmit(event) {
  event.preventDefault();
  const comment = new FormData(event.target).get('comment').valueOf();
  const res = await fetch('/comments', {
    method: 'POST',
    body: JSON.stringify({ comment }),
    headers: new Headers({ 'content-type': 'application/json' }),
  });
  if (!res.ok) {
    alert('Error posting comment');
    return;
  }
  const body = await res.json();
  addComment(body);
  // reset form
  event.target.reset();
}
