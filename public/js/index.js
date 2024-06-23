// javascript for index.html
//let searchInput = document.getElementById('searchInput');

const sidebar = document.querySelector('.sidebar');
//const searchForm = document.getElementById('.term');
const searchForm = document.querySelector('.search');
//const searchForm = document.getElementById('.search');
let lineMarker = document.getElementById("get-polyline");

let buttonMarker = document.getElementById("get-marker");
let moyenFiltered = document.getElementById("get-moyen");
let contentFiltered = document.getElementById("get-content");
let pascontentFiltered = document.getElementById("get-pascontent");
//let moyenFiltered = document.getElementById("get-content");
const URL = "https://igua.onrender.com/posts";
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
let map = L.map("map", {center: [43.2, 1.30], zoom: 7});
let myPolyline2 = L.featureGroup().addTo(map);
let myMarker = L.featureGroup().addTo(map);
var latlngs3 = [
  [42.385044, 1.3],
  [41.506174, 2.0],
  [43.686816, 3.8]
];
 // Creating a polygon
 //var polyline3 = L.polygon(latlngs3, {color: 'orange'});
//var layerGroup = L.layerGroup([polyline3]);
//layerGroup.addTo(map); 

var layerGroup = L.layerGroup();
layerGroup.addTo(map); 
const searchInput = document.getElementById('searchInput');
const list = document.querySelector('.sidebar');
const items = list.querySelector('.sidebar-item');

const renderPosts = async (term) => {
  //  apiUrl = 'https://igua.onrender.com/posts?_sort=id&_order=desc';
  let uri = 'https://igua.onrender.com/posts?_sort=likes&_order=desc';
  if (term) {
    uri += `&q=${term}`
  }

  const res = await fetch(uri);
  const posts = await res.json();
 
  posts.forEach(post => {
  var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
    icon: myIconBlue,
    draggable: true,
  }).addTo(myMarker).bindPopup(post.title);

  if (posts.category === "bas") 
   var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
      icon: myIconRed,
      draggable: true,
    }).addTo(myMarker).bindPopup(post.title);

else if (posts.category === "moyen")
var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
  icon: myIconGrey,
  draggable: true,
}).addTo(myMarker).bindPopup(post.title) 
  // console.log(posts);
})
  let template = ''; 
 for (let post of posts) {
    template += `
  <div class="sidebar-item">
    <h5>${post.title}</h5>
      <div class="flex-shrink-0 h-20 w-20">
                <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
            </div>    
    <img class="circular_image" src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
     alt=" ${post.category}">
      
 
   <small> ${post.body.slice(0, 30)}...</small> <div class="text-sm text-gray-500">
                    ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
                </div>    
    <a href="/updatePolygone.html?id=${post.id}">Update</a>
    <a href="/detailsAvis.html?id=${post.id}">Avis</a>
     </div>
`
}
  
sidebar.innerHTML = template;
}
contentFiltered.addEventListener("click", function() {
  // myMarker.clearLayers();
  layerGroup.clearLayers();
  
  sidebar.innerHTML = "<p>Loading...";
  
  fetch(URL)
  .then((response) => response.json())
  .then((posts) => 
   
  sidebar.innerHTML = getListOfNames(posts));
  
  const getListOfNames = (posts) => {
    var polyline2 = L.polygon(posts
      .filter(post => post.category === "bon")
      .map(post => [post.latitudeSelectionee, post.longitudeSelectionee]),
     {color: 'blue'});
     // Creating latlng object
   /*  var latlngs = [
      [17.385044, 78.486671],
      [16.506174, 80.648015],
      [17.686816, 83.218482]
   ];*/
 
   // Creating a polygon
  
  // var polygon = L.polygon(latlngs, {color: 'red'});
   // Creating a circle

       // Creating layer group
     //  var layerGroup = L.layerGroup([polyline2]);
      // var circle = L.circle([43.506174, 1.648015], 50000, {color: 'red', fillColor:
        // '#f03', fillOpacity: 0} );
      
      // Adding circle to the layer group
      layerGroup.addLayer(polyline2);
   //   layerGroup.addLayer(circle);
       layerGroup.addTo(map);    // Adding layer group to map
  const names = posts.filter(post => post.category === "bon") 
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
 // fine getListOfNames
  };
  // fine contentFiltered
    })
      //toglie il blu ma non il rosso
moyenFiltered.addEventListener("click", async function() { 
  //layerGroup.removeLayer(circle);
  layerGroup.clearLayers();
    // myPolyline2.clearLayers();
      fetch(URL)
      .then((response) => response.json())
      .then((posts) =>        
        sidebar.innerHTML = getListOfNames(posts));
      
      const getListOfNames = (posts) => {
        var polyline1 = L.polygon(posts
          .filter(post => post.category === "moyen")
          .map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
          color: 'grey'
        });
        // Creating layer group
      //  var layerGroup = L.layerGroup([polyline1]);
        layerGroup.addLayer(polyline1);
        layerGroup.addTo(map); 
                   
             //  map.fitBounds(layerGroup.getBounds());  
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
pascontentFiltered.addEventListener("click", async function() {
  layerGroup.clearLayers(); 
 // myPolyline2.clearLayers();
  //  sidebar.innerHTML = "<p>Loading...";
    
    fetch(URL)
    .then((response) => response.json())
    .then((posts) =>  
      sidebar.innerHTML = getListOfNames(posts));
    
    const getListOfNames = (posts) => {
      var polyline3 = L.polygon(posts
        .filter(post => post.category === "bas")
        .map(post => [post.latitudeSelectionee, post.longitudeSelectionee]),{
         color: 'red'
      });
       
        layerGroup.addLayer(polyline3);
        layerGroup.addTo(map); 
     // if (post.category === "pascontent") 
       /* var marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
           icon: myIconRed,
           draggable: true,
         }).addTo(myMarker).bindPopup(post.title);*/
      // var layerGroup = L.layerGroup([polyline3]);3
       //  layerGroup.addLayer(polyline3);
 /* const featureGroup = L.featureGroup();
  featureGroup.addTo(map)
        
         featureGroup.addLayer(myMarker)
         featureGroup.addLayer(myPolyline2)
             
         map.fitBounds(layerGroup.getBounds());*/
    const names = posts.filter(post => post.category === "bas") 
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
// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderPosts());

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
  {attribution: '&copy; <a href="http://' + 
  'www.openstreetmap.org/copyright">OpenStreetMap</a>'}
).addTo(map);
