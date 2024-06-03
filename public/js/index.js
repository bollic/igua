// javascript for index.html
const sidebar = document.querySelector('.sidebar');
const searchForm = document.querySelector('.search');

let buttonMarker = document.getElementById("get-marker");
let moyenFiltered = document.getElementById("get-moyen");
let button2Filtered = document.getElementById("get-filter2");
async function afficherFilms() {
  apiUrl = 'https://igua.onrender.com/posts?_sort=id&_order=desc';
  /*if (term) {
    apiUrl += `&q=${term}`
  }*/
  // Set up query parameters
const queryParams = {
  //profile: 'img/cameleon-casque-chamaeleo-calyptratus.jpg'
  //term: 'DUE'

 // q: ' content'
};
// Convert query parameters to a string
const queryString = new URLSearchParams(queryParams).toString();

// Combine API endpoint with query parameters
const fullUrl = `${apiUrl}?${queryString}`;

 // let uri = 'http://localhost:3001/posts';
  const response = await fetch(apiUrl);
  const posts = await response.json();
  let template = '';
  posts.forEach(post => {
   // let td = document.createElement('tr');
 template += `
    <div class="sidebar-item">
            <div class="flex-shrink-0 h-20 w-20">
                <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
            </div>         
                <div >
                    ${post.title}
                </div>
                  ${post.date}
                //${new Date(post.timestamp)}
                <div class="text-sm text-gray-500">
                    ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
                </div>          
        </div>
    `
  });
//      ${new Date(post.timestamp)}
  sidebar.innerHTML = template;
 // console.log(piecesFiltrees);
}
afficherFilms()
//async function renderPosts (term, term2) {
//let uri = 'http://localhost:3001/posts?_sort=id&_order=asc';
// Specify the API endpoint for user data

button2Filtered.addEventListener("click", function() {
  apiUrl = 'https://igua.onrender.com/posts';
  const URL = "https://igua.onrender.com/posts";
  let template = '';
//const sidebar = document.getElementByClass("sidebar");
sidebar.innerHTML = "<p>Loading...";

fetch(URL)
.then((response) => response.json())
.then((posts) => 
 
  sidebar.innerHTML = getListOfNames(posts));

const getListOfNames = (posts) => {

const names = posts.filter(post => post.category === "content") 
.map((post) => ` <div class="sidebar-item">
<div class="flex-shrink-0 h-20 w-20">
    <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
</div>         
    <div >
        ${post.title}<li>Le moral est ${post.category} - à cause de ${post.cause} </li>
    </div>  
    <div class="text-sm text-gray-500">
        ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
    </div>          
</div>`).join("\n");
// .filter(person => person.gender === 'cheese') 
  return `<ul>${names}</ul>`;
};
  // Set up query parameters
/*const queryParams = {
  cause: 'chaud',
};*/
// Convert query parameters to a string
//const queryString = new URLSearchParams(queryParams).toString();

// Combine API endpoint with query parameters
//const fullUrl = `${apiUrl}?${queryString}`;

  // Make a GET request using the Fetch API
  fetch(apiUrl)
    .then(response => {
      
      //myData.map.filter(post => post.cause === 'chaud') 
      if (!response.ok) {        
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(myData => {
       //aggiunto 28 maggio 
      // const itemNames = (myData) => {
        const itemNames = myData.map((myData) => `<li>${myData.moyen} - ${myData.chaud} </li>`).join("\n");
      // after map :   .filter(person => person.gender === 'cheese') 
        return `<ul>CIAO${itemNames}</ul>`;
     // };
    /*  const itemNames = myData.map((myData) => {
        return myData.title;
        })*/
    //  console.log(itemNames)
      //fine aggiunto
     
      // Process the retrieved user data
    /*  let template = '';
      myData.forEach(post => {
        // let td = document.createElement('tr');
      template += `
         <div class="sidebar-item">
                 <div class="flex-shrink-0 h-20 w-20">
                     <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
                 </div>         
                     <div >
                         ${post.title}
                     </div>
                     <div >
                     
                     </div >
                     <div class="text-sm text-gray-500">
                         ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
                     </div>          
             </div>
         `
       });
       sidebar.innerHTML = template;
      console.log('User Data:', myData);*/
    })
    .catch(error => {
      console.error('Error:', error);
    })
  })

moyenFiltered.addEventListener("click", function() {
apiUrl = 'https://igua.onrender.com/posts?category=moyen';
// Make a GET request using the Fetch API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(myData => {
    // Process the retrieved user data
    let template = '';
    myData.forEach(post => {
      // let td = document.createElement('tr');
    template += `
       <div class="sidebar-item">
               <div class="flex-shrink-0 h-20 w-20">
                   <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
               </div>         
                   <div>
                       ${post.title}<li>Le moral est ${post.category} - à cause de ${post.cause} </li>
                   </div>
                 
                   <div class="text-sm text-gray-500">
                       ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
                   </div>          
           </div>
       `
     });
     sidebar.innerHTML = template;
    console.log('User Data:', myData);
  })
  .catch(error => {
    console.error('Error:', error);
  })
})
/*
if (term) {
    uri += `&q=${term}`
  }*/
 
  //fetch("http://localhost:3000/posts").then(req => req.text()).then(console.log)
 
 
 // console.log(posts);
  //inizio
 

  // loop through data
 
//la fine del renderpost
//}

// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  afficherFilms(searchForm.term.value.trim());
})

//window.addEventListener('DOMContentLoaded', () => renderPosts());
