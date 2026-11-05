let lat = 42.37443;
let lng = -71.11718;
let title = "John Harvard Statue";

document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map")
  map.setView([lat, lng], 17);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<strong>${title}</strong>`);
});
