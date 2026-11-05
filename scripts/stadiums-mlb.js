// Create the map in the element with id="map".
// No setView() here: the view is set later with fitBounds(), once we know where the stadiums are.
const map = L.map("map");

let league = "MLB";
addMarkers(league);

// Load the stadium data from a local JSON file.
// fetch() is asynchronous, so we "await" the response and then the parsed JSON.
async function getStadiums() {
  let response = await fetch("./data/stadiums.json");
  let data = await response.json();
  return data;
}

async function addMarkers(league) {
  // Get all stadiums, then keep only the ones in the requested league
  let stadiums = await getStadiums();
  let leagueStadiums = stadiums.stadiums.filter((s) => s.league == league);
  console.log(stadiums);
  console.log(leagueStadiums);

  // Make arrays of just the longitudes and latitudes
  let longitudes = leagueStadiums.map((s) => s.lng);
  let latitudes = leagueStadiums.map((s) => s.lat);

  console.log(longitudes);
  console.log(latitudes);

  // A bounding box around all the stadiums; "..." spreads the array into arguments for Math.min/max
  let bounds = [
    [Math.min(...latitudes), Math.min(...longitudes)], // Southwest corner
    [Math.max(...latitudes), Math.max(...longitudes)], // Northeast corner
  ];
  console.log(bounds);

  // Center and zoom the map so the whole box is visible, with some padding (in pixels)
  map.fitBounds(bounds, { padding: [30, 30] });

  // Add the background map images ("tiles") from OpenStreetMap; attribution is required
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Add one marker (with a popup) for each stadium
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

    // Build a CSS class from league and division, e.g. "MLB" + "AL East" -> "mlb-al-east".
    // styles/main.css uses these classes to give each division a different marker color.
    let markerClass = `${league.toLowerCase().replace(/\s+/g, "-")}-${division.toLowerCase().replace(/\s+/g, "-")}`;
    console.log(markerClass);
    // _icon is the marker's <img> element (an internal Leaflet property)
    marker._icon.classList.add(markerClass);
  }
}
