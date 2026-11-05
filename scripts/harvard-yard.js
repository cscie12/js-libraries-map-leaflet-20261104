// Location of the marker (latitude, longitude) and its popup label
let lat = 42.37443;
let lng = -71.11718;
let title = "John Harvard Statue";

// Wait until the HTML is parsed so the #map element exists
document.addEventListener("DOMContentLoaded", function () {
  // Create a map in the element with id="map", centered on our point at zoom level 17
  const map = L.map("map")
  map.setView([lat, lng], 17);

  // Add the background map images ("tiles") from OpenStreetMap; attribution is required
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Add a marker, with a popup that opens when it is clicked
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<strong>${title}</strong>`);
});
