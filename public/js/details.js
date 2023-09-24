// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');

const renderDetails = async () => {

  const res = await fetch('https://wild-gray-beaver-robe.cyclic.cloud/posts/' + id);
  if (!res.ok) {

    window.location.replace('/');
   // window.location.replace("/");
  }
  const post = await res.json();

  const template = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `

  container.innerHTML = template;
}

deleteBtn.addEventListener('click', async () => {
  const res = await fetch('https://wild-gray-beaver-robe.cyclic.cloud/posts/' + id, {
    method: 'DELETE'
  });
 window.location.replace("/");
})

window.addEventListener('DOMContentLoaded', renderDetails);
