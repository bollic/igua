
// javascript for index.html
const sidebar = document.querySelector('.sidebar');
const searchForm = document.querySelector('.search');
let buttonMarker = document.getElementById("get-marker");
 /*navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    latText.innerText = lat.toFixed(2);
    longText.innerText = long.toFixed(2);
}); */
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
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
    {attribution: '&copy; <a href="http://' + 
    'www.openstreetmap.org/copyright">OpenStreetMap</a>'}
).addTo(map);
   
  
//    let button = document.getElementById("get-polygon");

 /*
/*
let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(
            "You clicked the map at -<br>" + 
            "<b>lon:</b> " + e.latlng.lng + "<br>" + 
            "<b>lat:</b> " + e.latlng.lat
        )
        .openOn(map);
}
map.addEventListener("click", onMapClick);


let myLocation = L.layerGroup().addTo(map);
map.addEventListener("click", mapClick);
function mapClick(e) {
    myLocation.clearLayers();
    L.marker(e.latlng).addTo(myLocation);
    latSel = e.latlng.lat;
    lonSel = e.latlng.lng;
  //  lat = position.coords.latitude;
    //lon = position.coords.longitude;

// console.log(myLocation);
//alert(myLocation);
    document.getElementById('latitudeSelectionee').textContent = latSel;
    document.getElementById('longitudeSelectionee').textContent = lonSel;

    //document.getElementById('latSel').textContent = "You clicked the map at " + e.latlng.lat;
    //document.getElementById('lonSel').textContent = "You clicked the map at " + e.latlng.lng;
}
*/
const renderPosts = async (term) => {

//fetch('https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts');
 //https://wild-gray-beaver-robe.cyclic.cloud
// my-json-server.typicode.com/user/repo/posts/1
let uri = 'http://libriecopertine.altervista.org/db.json';
// https://my-json-server.typicode.com/bollic/iguaa/posts
let uri = https://wild-gray-beaver-robe.cyclic.cloud/posts;
// https://github.com/bollic/iguaa/blob/main/db.json
  if (term) {
    uri += `&q=${term}`
  }
 
  const res = await fetch(uri);
  const posts = await res.json();
 // console.log(posts);
  //inizio

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
                <div class="text-sm text-gray-500">
                    ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
                </div>          
        </div>
    `
  });

  sidebar.innerHTML = template;

  // loop through data
  //let myPolyline3 = L.featureGroup().addTo(map);
  let myPolyline2 = L.featureGroup().addTo(map);
  let myMarker = L.featureGroup().addTo(map);
posts.forEach(post => {
 buttonMarker.addEventListener("click", function() {
  if (post.category==="pascontent")   
  var polyline2 = L.polyline(posts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'red'
  }).addTo(myPolyline2);
 /* if (post.category==="content")   
  var polyline3 = L.polyline(posts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
    color: 'yellow'
  }).addTo(myPolyline3);*/

 });
   /*

    var polyline3 = L.polyline(posts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), {
      color: 'magenta'
    }).addTo(map);
    */
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
   
     /*
    else if (post.category === "moyen")
    marker = new L.marker([post.latitudeSelectionee, post.longitudeSelectionee], {
      icon: myIcon1,
      draggable: true,
    }).addTo(map).bindPopup(post.title)   
     */
    
 
 const featureGroup = L.featureGroup();
 featureGroup.addTo(map)
       
        featureGroup.addLayer(myMarker)
        featureGroup.addLayer(myPolyline2)
            
        map.fitBounds(featureGroup.getBounds());

 //});  

})

}

// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderPosts());
