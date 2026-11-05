// Same approach as stadiums-mlb.js, but for the NHL.
// zoomSnap: 0.1 allows fractional zoom levels, so fitBounds() can fit the stadiums more tightly
// (by default, zoom snaps to whole numbers).
const map = L.map("map", {
  zoomSnap: 0.1,
});

let league = "NHL";
addMarkers(league);

// Load the stadium data from a local JSON file
async function getStadiums() {
  let response = await fetch("./data/stadiums.json");
  let data = await response.json();
  return data;
}

async function addMarkers(league) {
  // Keep only the stadiums in the requested league
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

  // Background map tiles from OpenStreetMap
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

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

    // Add a class like "nhl-pacific" so CSS can color markers by division
    let markerClass = `${league.toLowerCase().replace(/\s+/g, "-")}-${division.toLowerCase().replace(/\s+/g, "-")}`;
    console.log(markerClass);
    marker._icon.classList.add(markerClass);
  }
}
