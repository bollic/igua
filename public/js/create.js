// javascript for create.html
const form = document.querySelector('form');
//const box = document.querySelectorAll('box');
document.addEventListener('click', function(event) {

  if (event.target.dataset.title != undefined) {
 t =  event.target.dataset.title;
 // h2.innerHTML = t;
 h2.textContent = t
   //  alert(t); 
  }
});
/*
 // attraper sur document...
 document.addEventListener("hello", function(event) { // (1)
  alert("Hello from " + event.target.tagName); // Hello de H1
});

// ...distribué sur elem!
let event = new Event("hello", {bubbles: true}); // (2)
elem.dispatchEvent(event);

// le gestionnaire sur le document activera et affichera le message.*/

let map = L.map("map", {center: [43.262218, 1.801472], zoom: 7});
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
    {attribution: '&copy; <a href="http://' + 
    'www.openstreetmap.org/copyright">OpenStreetMap</a>'}
).addTo(map);

L.marker(L.latLng(31.264, 34.802)).addTo(map);

  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }

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
 
    document.getElementById('latitudeSelectionee').textContent = latSel;
    document.getElementById('longitudeSelectionee').textContent = lonSel;
}

const createPost = async (e) => {
e.preventDefault();
//e.stopPropagation();
  const doc = {
    title: form.title.value,
    category: form.category.value,
    cause: form.cause.value,
    body: form.body.value,
    date: form.date.value,
    profile: document.querySelector('h2').textContent,
    latitudeSelectionee: document.getElementById('latitudeSelectionee').textContent,
    longitudeSelectionee: document.getElementById('longitudeSelectionee').textContent,
   likes: 0,
  }

 // h2.innerHTML = t;
//https://app.cyclic.sh/#/app/bollic-igua/builds/
//  https://wild-gray-beaver-robe.cyclic.cloud/posts
  //http://libriecopertine.altervista.org/
  //https://my-json-server.typicode.com/bollic/iguaa/posts?_sort=title&_order=asc
  await fetch('http://libriecopertine.altervista.org/db.json', {
    method: 'POST',
  //  mode: "cors", // no-cors, *cors, same-origin
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('/')
}

form.addEventListener('submit', createPost);
