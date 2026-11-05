// Builds on stadiums-mlb.js / stadiums-nhl.js: the league now comes from a <select>,
// and the markers are redrawn whenever the selection changes.

// Create the map once; addMarkers() reuses it each time the league changes
const map = L.map("map", { zoomSnap: 0.1 });

// Background map tiles from OpenStreetMap; added once here, since they don't change with the league
const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Stop the form from submitting (which would reload the page); just redraw the markers instead
let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addMarkers();
});

// Redraw the markers whenever a different league is selected
document
  .getElementById("league-options")
  .addEventListener("change", addMarkers);

// Draw the markers for the initially selected league
addMarkers();

// Load the stadium data from a local JSON file
async function getStadiums() {
  let response = await fetch("./data/stadiums.json");
  let data = await response.json();
  return data;
}

async function addMarkers() {
  /* first, clear existing markers */
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Read the selected league and show it in the page heading
  let league = document.getElementById("league-options").value;
  document.getElementById("leaguename").textContent = league;

  // Keep only the stadiums in the selected league
  let stadiums = await getStadiums();
  let leagueStadiums = stadiums.stadiums.filter((s) => s.league == league);
  console.log(stadiums);
  console.log(leagueStadiums);

  let longitudes = leagueStadiums.map((s) => s.lng);
  let latitudes = leagueStadiums.map((s) => s.lat);

  console.log(longitudes);
  console.log(latitudes);

  // A bounding box around all the stadiums
  let bounds = [
    [Math.min(...latitudes), Math.min(...longitudes)], // Southwest corner
    [Math.max(...latitudes), Math.max(...longitudes)], // Northeast corner
  ];
  console.log(bounds);

  // Zoom and center the map to show the whole box
  map.fitBounds(bounds, { padding: [30, 30] });

  // One marker per stadium
  for (let stadium of leagueStadiums) {
    let lat = stadium.lat;
    let lng = stadium.lng;
    let team = stadium.team;
    let league = stadium.league;
    let division = stadium.division;
    console.log(`${lat} ${lng} ${team}`);
    let marker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<p>${team}<br/>${league} - ${division}</p>`);

    // Add a class like "nfl-afc-east" so CSS can color markers by division
    let markerClass = `${league.toLowerCase().replace(/\s+/g, "-")}-${division.toLowerCase().replace(/\s+/g, "-")}`;
    console.log(markerClass);
    marker._icon.classList.add(markerClass);
  }
}
