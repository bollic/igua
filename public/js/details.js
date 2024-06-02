
// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');

const renderDetails = async () => {

  const res = await fetch('http://localhost:3001/posts/' + id);
  if (!res.ok) {

    window.location.replace('/');
   // window.location.replace("/");
  }
  const post = await res.json();

  const template = `
  
  <div align="center">
                <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
             
 
    <h1>${post.title}</h1>
    <p>${post.body}</p> 
    </div>    
  `

  container.innerHTML = template;
}

deleteBtn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3001/posts/' + id, {
    method: 'DELETE'
  });
 window.location.replace("/");
})

window.addEventListener('DOMContentLoaded', renderDetails);
