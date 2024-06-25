// JavaScript for index.html

const URL = "https://igua.onrender.com/posts";
const sidebar = document.querySelector('.sidebar');
const searchForm = document.querySelector('.search');
const lineMarker = document.getElementById("get-polyline");
const buttonMarker = document.getElementById("get-marker");
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
let layerGroup = L.layerGroup().addTo(map);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
).addTo(map);

const renderPosts = async (term = '') => {
  let uri = `${URL}?_sort=likes&_order=desc`;
  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  const posts = await res.json();

  const template = posts.map(post => `
    <div class="sidebar-item">
      <h5>${post.title}</h5>
      <div class="flex-shrink-0 h-20 w-20">
        <img src="${post.profile}" class="h-20 w-20 rounded-full" alt="">
      </div>
      <img class="circular_image" src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png' alt="${post.category}">
      <small>${post.body.slice(0, 30)}...</small>
      <div class="text-sm text-gray-500">
        ${post.id}  <a href="details.html?id=${post.id}">Read more</a>
      </div>
      <a href="/updatePolygone.html?id=${post.id}">Update</a>
      <a href="/detailsAvis.html?id=${post.id}">Avis</a>
    </div>
  `).join('');

  sidebar.innerHTML = template;
};

const getListOfNames = (posts, category, color) => {
  const filteredPosts = posts.filter(post => post.category === category);
  const polyline = L.polygon(filteredPosts.map(post => [post.latitudeSelectionee, post.longitudeSelectionee]), { color });

  layerGroup.addLayer(polyline);

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

contentFiltered.addEventListener("click", async () => {
  layerGroup.clearLayers();
  sidebar.innerHTML = "<p>Loading...</p>";

  const res = await fetch(URL);
  const posts = await res.json();

  sidebar.innerHTML = getListOfNames(posts, "bon", 'blue');
});

moyenFiltered.addEventListener("click", async () => {
  layerGroup.clearLayers();

  const res = await fetch(URL);
  const posts = await res.json();

  sidebar.innerHTML = getListOfNames(posts, "moyen", 'grey');
});

pascontentFiltered.addEventListener("click", async () => {
  layerGroup.clearLayers();

  const res = await fetch(URL);
  const posts = await res.json();

  sidebar.innerHTML = getListOfNames(posts, "bas", 'red');
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());
