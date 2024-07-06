// JavaScript for index.html
const URL = "https://igua.onrender.com/posts";
const sidebar = document.querySelector('.sidebar');
const searchForm = document.querySelector('.search');
const allMarkerLine = document.getElementById("get-polyline");
const allMarker = document.getElementById("get-marker");
const moyenFiltered = document.getElementById("get-moyen");
const contentFiltered = document.getElementById("get-content");
const pascontentFiltered = document.getElementById("get-pascontent");
let map = L.map("map", { center: [43.2, 1.30], zoom: 7 });
let layerGroup = L.featureGroup().addTo(map);

// Marker

const myIconGrey = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png'
});

const myIconBlue = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
});

const myIconRed = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
});


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",  {
  preload: true,
 /*  maxZoom: 19,*/
    formatData: "webp",
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
).addTo(map);

// Fonction pour afficher les publications et les ajouter sur la carte
const renderPosts = async (term) => {
  let uri = 'https://igua.onrender.com/posts?_sort=date&_order=asc';
  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  const posts = await res.json();

  let template = '';
  const filteredPosts = [];
  
  for (let post of posts) {
    template += `
      <div class="sidebar-item">
        <h5>${post.title}</h5>
        <div class="flex-shrink-0 h-20 w-20">
          <img src="${post.profile}" class="h-15 w-15 rounded-full" alt="">
        </div>
         <small>${post.date}</small>
        <small>${post.body.slice(0, 30)}...</small>
        <div class="text-sm text-gray-500">
          ${post.id} <a href="details.html?id=${post.id}">Read more</a>
        </div>
        <a href="/updatePolygone.html?id=${post.id}">Update</a>
        <a href="/detailsAvis.html?id=${post.id}">Avis</a>
      </div>
    `;
    filteredPosts.push(post);
  }

  sidebar.innerHTML = template;
  
  // Clear existing layers
  layerGroup.clearLayers();

  // Add new layers based on the filtered posts
  const addLayers = (posts, color, icon, popup) => {
    const latlngs = posts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]);
    const polyline = L.polyline(latlngs, { color });
    layerGroup.addLayer(polyline);

    posts.forEach(post => {
      var singleMarker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon, draggable: true});
      var popup = singleMarker.bindPopup("<br><STRONG>"+ post.title+"</STRONG></br><div class='flex-shrink-0 h-20 w-20'><img class='h-20 w-20 rounded-full' alt='' src="+ post.profile + "></div>" +singleMarker.getLatLng()).openPopup()
      popup.addTo(map);
   
      layerGroup.addLayer(singleMarker);

    });
    
  };

  // Use appropriate icon and color based on category
  const colors = { "bon": 'blue', "moyen": 'grey', "bas": 'red' };
  const icons = { "bon": myIconBlue, "moyen": myIconGrey, "bas": myIconRed };
  
  filteredPosts.forEach(post => {
    addLayers([post], colors[post.category], icons[post.category]);
  });

  // Adjust map to fit bounds of all layers
  if (layerGroup.getLayers().length > 0) {
    map.fitBounds(layerGroup.getBounds());
  }
};

// Événement pour le formulaire de recherche
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());

const getListOfNames = (posts, category, color, icon) => {
  const filteredPosts = posts.filter(post => post.category === category);
  const polyline = L.polygon(filteredPosts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), { color });
  
  layerGroup.addLayer(polyline);

  filteredPosts.forEach(post => {
    var singleMarker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon, draggable: true});
   
    var popup = 
      singleMarker.bindPopup(
        "<br><STRONG>"+ post.title+"</STRONG></br><div class='flex-shrink-0 h-20 w-20'><img class='h-20 w-20 rounded-full' alt='' src="+ post.profile + "></div>" +singleMarker.getLatLng()).openPopup()
     
      //var popup = singleMarker.bindPopup("This is <br><STRONG>"+ post.title+"</STRONG></br>" +singleMarker.getLatLng()).openPopup()
    //  popup.addTo(map);
   
    var popup = singleMarker.bindPopup("<br><STRONG>"+ post.title+"</STRONG></br><div class='flex-shrink-0 h-20 w-20'><img class='h-20 w-20 rounded-full' alt='' src="+ post.profile + "></div>" +singleMarker.getLatLng()).openPopup()
     
    popup.addTo(map);
    const marker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon });
    layerGroup.addLayer(singleMarker);
  });

  // Adjust map to fit bounds of all layers
  if (layerGroup.getLayers().length > 0) {
    map.fitBounds(layerGroup.getBounds());
    
  }

  const names = filteredPosts.map(post => `
    <div class="sidebar-item">
      <div class="flex-shrink-0 h-20 w-20">
        <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
      </div>
      <div>${post.title}<li>Le moral est ${post.category} - à cause de ${post.cause}</li></div>
      <div class="text-sm text-gray-500">
        ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
      </div>
    </div>
  `).join('');

  return `<ul>${names}</ul>`;
};

const getAllNames = (posts, likes, color, icon) => {
  const notFilteredPosts = posts.filter(post => post.likes === likes);
  const polygon = L.polygon(notFilteredPosts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), { color });
  
  layerGroup.addLayer(polygon);

  notFilteredPosts.forEach(post => {
    const Marker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon });
   
    //var popup = toutMarker.bindPopup("<br><STRONG>"+ post.category+"</STRONG></br><div class='flex-shrink-0 h-20 w-20'><img class='h-20 w-20 rounded-full' alt='' src="+ post.profile + "></div>" +toutMarker.getLatLng()).openPopup()
     
  // popup.addTo(map);
    layerGroup.addLayer(Marker);
  });

  // Adjust map to fit bounds of all layers
  if (layerGroup.getLayers().length > 0) {
    map.fitBounds(layerGroup.getBounds());
    
  }

  const names = notFilteredPosts.map(post => `
    <div class="sidebar-item">
      <div class="flex-shrink-0 h-20 w-20">
        <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
      </div>
      <div>${post.title}<li>Le moral est ${post.category} - à cause de ${post.cause}</li></div>
      <div class="text-sm text-gray-500">
        ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
      </div>
    </div>
  `).join('');

  return `<ul>${names}</ul>`;
};

const getAll = (posts, likes, color, icon) => {
  const notFilteredPosts = posts.filter(post => post.likes === likes);
  const maxcut = L.polyline(notFilteredPosts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), { color });
  
  layerGroup.addLayer(maxcut);

  notFilteredPosts.forEach(post => {
    const zigzagMarker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon });
    var popup = zigzagMarker.bindPopup("<br><STRONG>"+ post.title+"</STRONG></br><div class='flex-shrink-0 h-20 w-20'><img class='h-20 w-20 rounded-full' alt='' src="+ post.profile + "></div>" +zigzagMarker.getLatLng()).openPopup()
    popup.addTo(map);
 
   
    layerGroup.addLayer(zigzagMarker);
  });

  // Adjust map to fit bounds of all layers
  if (layerGroup.getLayers().length > 0) {
    map.fitBounds(layerGroup.getBounds());
  }

  const names = notFilteredPosts.map(post => `
    <div class="sidebar-item">
      <div class="flex-shrink-0 h-20 w-20">
        <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
      </div>
      <div>${post.title}<li>Le moral est ${post.category} - à cause de ${post.cause}</li></div>
      <div class="text-sm text-gray-500">
        ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
      </div>
    </div>
  `).join('');

  return `<ul>${names}</ul>`;
};

contentFiltered.addEventListener("click", async () => {
  layerGroup.clearLayers();
  const res = await fetch(URL);
  const posts = await res.json();
  sidebar.innerHTML = getListOfNames(posts, "bon", 'blue', myIconBlue);
});

moyenFiltered.addEventListener("click", async () => {
  layerGroup.clearLayers();
  const res = await fetch(URL);
  const posts = await res.json();
  sidebar.innerHTML = getListOfNames(posts, "moyen", 'grey', myIconGrey);
});

pascontentFiltered.addEventListener("click", async () => {
  layerGroup.clearLayers();
  const res = await fetch(URL);
  const posts = await res.json();
  sidebar.innerHTML = getListOfNames(posts, "bas", 'red', myIconRed);
});

allMarkerLine.addEventListener("click", async () => {
  layerGroup.clearLayers();
  const res = await fetch(URL);
  const posts = await res.json();
  sidebar.innerHTML = getAll(posts, 0, 'red', myIconRed);
});

allMarker.addEventListener("click", async () => {
  layerGroup.clearLayers();
  const res = await fetch(URL);
  const posts = await res.json();
  sidebar.innerHTML = getAllNames(posts, 0, 'red', myIconRed);
});
