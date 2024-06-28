// JavaScript for index.html
 const URL = "https://igua.onrender.com/posts";
//const URL = "http://localhost:3001/posts";
const sidebar = document.querySelector('.sidebar');
const searchForm = document.querySelector('.search');
const allLines = document.getElementById("get-polyline");
const allMarker = document.getElementById("get-marker");
const moyenFiltered = document.getElementById("get-moyen");
const contentFiltered = document.getElementById("get-content");
const pascontentFiltered = document.getElementById("get-pascontent");
const searchInput = document.getElementById('searchInput');
const list = document.querySelector('.sidebar');

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

let map = L.map("map", { center: [43.2, 1.30], zoom: 7 });
let myMarker = L.featureGroup().addTo(map);
let layerGroup = L.layerGroup().addTo(map);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
).addTo(map);
// Fonction pour afficher les publications et les ajouter sur la carte
const renderPosts = async (term) => {
  // let uri = 'https://igua.onrender.com/posts?_sort=likes&_order=desc';
  let uri = 'http://localhost:3001/posts?_sort=likes&_order=desc';
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
                  <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
              </div>
              <img class="circular_image" src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png' alt="${post.category}">
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
  const addLayers = (posts, color, icon) => {
      const latlngs = posts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]);
      const polyline = L.polygon(latlngs, { color });
      layerGroup.addLayer(polyline);

      posts.forEach(post => {
          const marker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon });
          layerGroup.addLayer(marker);
      });
      layerGroup.addTo(map);
  };

  // Use appropriate icon and color based on category
  const colors = { "bon": 'blue', "moyen": 'grey', "bas": 'red' };
  const icons = { "bon": myIconBlue, "moyen": myIconGrey, "bas": myIconRed };
  
  filteredPosts.forEach(post => {
      addLayers([post], colors[post.category], icons[post.category]);
  });
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
  //layerGroup.getBounds();
  //map.fitBounds(layerGroup.getBounds()); 
 
  filteredPosts.forEach(post => {
    const marker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon });
    layerGroup.addLayer(marker);
    //marker.fitBounds(layerGroup.getBounds(marker)); 
  
  });

 
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
  //layerGroup.getBounds();
  //map.fitBounds(layerGroup.getBounds()); 
  notFilteredPosts.forEach(post => {
    const toutMarker = L.marker([post.latitudeSelectionee, post.longitudeSelectionee], { icon });
    layerGroup.addLayer(toutMarker);
    //marker.fitBounds(layerGroup.getBounds(marker)); 
  });

 
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
  sidebar.innerHTML = "<p>Loading...</p>";
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

allMarker.addEventListener("click", async () => {
  layerGroup.clearLayers();
  const res = await fetch(URL);
  const posts = await res.json();
  sidebar.innerHTML = getAllNames(posts, 0, 'orange', myIconRed);
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());
