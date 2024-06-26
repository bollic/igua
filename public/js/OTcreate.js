// javascript for create.html
const form = document.querySelector('form');
const box1 = document.getElementById('box1');
box1.addEventListener('click', function(event) {
//preventDefault(event);
//event.preventDefault();

  if (event.target.title != undefined) {
 t =  event.target.title;
 // h2.innerHTML = t;
 h2.innerHTML = t
    // alert(t); 
   // h2.dispatchEvent(event);
  }
 // box1.stopPropagation();
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

  await fetch('http://localhost:4000/posts', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('/public/')
}

form.addEventListener('submit', createPost);