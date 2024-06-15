// javascript for index.html
const sidebar = document.querySelector('.sidebar');
const searchForm = document.querySelector('.search');
const chercheForm = document.querySelector('.search');
let lineMarker = document.getElementById("get-polyline");

let buttonMarker = document.getElementById("get-marker");
let moyenFiltered = document.getElementById("get-moyen");
let contentFiltered = document.getElementById("get-content");
let pascontentFiltered = document.getElementById("get-pascontent");
//let moyenFiltered = document.getElementById("get-content");
const URL = "http://localhost:3001/posts";
//elements grafiques de la map

var myIconGrey = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40], 
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png'
});
// Icons2
var myIconBlue = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
});
// Icons2
var myIconRed = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
});
let map = L.map("map", {center: [43.58039085, 1.454315185546875], zoom: 7});
let myPolyline2 = L.featureGroup().addTo(map);
let myMarker = L.featureGroup().addTo(map);
async function afficherFilms() {
  //  https://igua.onrender.com/posts?_sort=id&_order=desc
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

 // L’envoi d’une requête GET à l’aide de l’API fetch ne nécessite que l’URL. Celle-ci renvoie alors une promesse à laquelle vous pouvez accéder à l’aide de la méthode then() ou des mots-clés async et await.
 /*fetch("http://localhost:3001/posts?_sort=id&_order=desc")
.then((response) => response.json())
.then((json) => console.log(json));*/
fetch("https://igua.onrender.com/posts?_sort=id&_order=desc")
.then((response) => response.json())
.then((json) => console.log(json));

  // loop through data
 /* let myPolyline2 = L.featureGroup().addTo(map);
  let myMarker = L.featureGroup().addTo(map);
  */
posts.forEach(post => {
  
  buttonMarker.addEventListener("click", function() {
  //if (post.category==="pascontent")   
  var polyline2 = L.polygon(posts.filter(post => post.category === "content").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'blue'
  }).addTo(myPolyline2);
  var polyline2 = L.polygon(posts.filter(post => post.category === "moyen").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'grey'
  }).addTo(myPolyline2);
  var polyline2 = L.polygon(posts.filter(post => post.category === "pascontent").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'red'
  }).addTo(myPolyline2);
});
lineMarker.addEventListener("click", function() {
  //if (post.category==="pascontent")   
  var polyline2 = L.polyline(posts.filter(post => post.category === "content").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'blue'
  }).addTo(myPolyline2);
  var polyline2 = L.polyline(posts.filter(post => post.category === "moyen").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'grey'
  }).addTo(myPolyline2);
  var polyline2 = L.polyline(posts.filter(post => post.category === "pascontent").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'red'
  }).addTo(myPolyline2);
});
 // if (post.category === "content") 
  
    var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
       icon: myIconBlue,
       draggable: true,
     }).addTo(myMarker).bindPopup(post.title);

     if (post.category === "pascontent") 
      var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
         icon: myIconRed,
         draggable: true,
       }).addTo(myMarker).bindPopup(post.title);
  
   else if (post.category === "moyen")
  var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
     icon: myIconGrey,
     draggable: true,
   }).addTo(myMarker).bindPopup(post.title) 


   
    //});  
   
   })
  

}
afficherFilms()
//async function renderPosts (term, term2) {
//let uri = 'http://localhost:3001/posts?_sort=id&_order=asc';
// Specify the API endpoint for user data

contentFiltered.addEventListener("click", function() {
// myMarker.clearLayers();
 myPolyline2.clearLayers();

sidebar.innerHTML = "<p>Loading...";

fetch(URL)
.then((response) => response.json())
.then((posts) => 
 
  sidebar.innerHTML = getListOfNames(posts));

const getListOfNames = (posts) => {
  var polyline2 = L.polygon(posts.filter(post => post.category === "content").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'blue'
  }).addTo(myPolyline2);
  
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

  })
    //toglie il blu ma non il rosso
  moyenFiltered.addEventListener("click", function() {
   
      

     myPolyline2.clearLayers();
    fetch(URL)
    .then((response) => response.json())
    .then((posts) => 
     
      sidebar.innerHTML = getListOfNames(posts));
    
    const getListOfNames = (posts) => {
      var polyline2 = L.polygon(posts.filter(post => post.category === "moyen").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
        color: 'grey'
      }).addTo(myPolyline2);
      const featureGroup = L.featureGroup();
      featureGroup.addTo(map)
            
             featureGroup.addLayer(myMarker)
             featureGroup.addLayer(myPolyline2)
                 
             map.fitBounds(featureGroup.getBounds());  
    const names = posts.filter(post => post.category === "moyen") 
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
    
      })
        
  //toglie il moyen  e il blu  
pascontentFiltered.addEventListener("click", function() {
  myPolyline2.clearLayers();
  sidebar.innerHTML = "<p>Loading...";
  
  fetch(URL)
  .then((response) => response.json())
  .then((posts) => 
   
    sidebar.innerHTML = getListOfNames(posts));
  
  const getListOfNames = (posts) => {
    var polyline2 = L.polygon(posts.filter(post => post.category === "pascontent").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
      color: 'red'
    }).addTo(myPolyline2);
    var marker = L.polygon(posts.filter(post => post.category === "pascontent").map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
      color: 'red'
    }).addTo(myMarker);
   // if (post.category === "pascontent") 
     /* var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
         icon: myIconRed,
         draggable: true,
       }).addTo(myMarker).bindPopup(post.title);*/
     
const featureGroup = L.featureGroup();
featureGroup.addTo(map)
      
       featureGroup.addLayer(myMarker)
       featureGroup.addLayer(myPolyline2)
           
       map.fitBounds(featureGroup.getBounds());
  const names = posts.filter(post => post.category === "pascontent") 
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
  
    })

/*
/*
if (term) {
    uri += `&q=${term}`
  }*/


chercheForm.addEventListener("click", function() {
  apiUrl = 'https://igua.onrender.com/posts';
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
