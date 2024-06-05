// javascript for index.html
const sidebar = document.querySelector('.sidebar');
const searchForm = document.querySelector('.search');
const chercheForm = document.querySelector('.search');

let buttonMarker = document.getElementById("get-marker");
let moyenFiltered = document.getElementById("get-moyen");
let button2Filtered = document.getElementById("get-filter2");

//elements grafiques de la map

var myIcon1 = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40], 
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png'
});
// Icons2
var myIcon2 = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
});
// Icons2
var myIcon3 = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
});
let map = L.map("map", {center: [43.58039085, 1.454315185546875], zoom: 7});
 
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
                <div class="text-sm text-gray-500">
                    ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
                </div>          
        </div>
    `
  });
//      ${new Date(post.timestamp)}
  sidebar.innerHTML = template;
 // console.log(piecesFiltrees);
 
  // loop through data
  let myPolyline2 = L.featureGroup().addTo(map);
  let myMarker = L.featureGroup().addTo(map);
posts.forEach(post => {
 buttonMarker.addEventListener("click", function() {
  //if (post.category==="pascontent")   
  var polyline2 = L.polyline(posts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'red'
  }).addTo(myPolyline2);
 
 });
  
    if (post.category==="content")   
   
   var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
      icon: myIcon2,
      draggable: true,
      //bounceOnAdd: true
    }).addTo(myMarker).bindPopup(post.title) 
  /*  var polyline = L.polyline([post.latitudeSelectionee, post.longitudeSelectionee], {
      color: 'magenta',
      //bounceOnAdd: true
    }).addTo(map)*/
    
    if (post.category === "pascontent") 
  
   var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
      icon: myIcon3,
      draggable: true,
    }).addTo(myMarker).bindPopup(post.title);
     if (post.category === "moyen")
   var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
      icon: myIcon1,
      draggable: true,
    }).addTo(myMarker).bindPopup(post.title) 
 


    const featureGroup = L.featureGroup();
    featureGroup.addTo(map)
          
           featureGroup.addLayer(myMarker)
           featureGroup.addLayer(myPolyline2)
               
           map.fitBounds(featureGroup.getBounds());
   
    //});  
   
   })
  

}
afficherFilms()
//async function renderPosts (term, term2) {
//let uri = 'http://localhost:3001/posts?_sort=id&_order=asc';
// Specify the API endpoint for user data

button2Filtered.addEventListener("click", function() {
  apiUrl = 'http://localhost:3001/posts';
  const URL = "http://localhost:3001/posts";
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
apiUrl = 'http://localhost:3001/posts?category=moyen';
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
//SEARCH

chercheForm.addEventListener("click", function() {
  apiUrl = 'http://localhost:3001/posts?q=NEUF';
  /*if (term) {
    uri += `&q=${term}`
  }*/
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
// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  afficherFilms(searchForm.term.value.trim());
})

//window.addEventListener('DOMContentLoaded', () => renderPosts());

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
  {attribution: '&copy; <a href="http://' + 
  'www.openstreetmap.org/copyright">OpenStreetMap</a>'}
).addTo(map);
