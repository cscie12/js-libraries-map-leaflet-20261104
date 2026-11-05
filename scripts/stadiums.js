const map = L.map("map", { zoomSnap: 0.1 });

let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  createMap();
});
document
  .getElementById("league-options")
  .addEventListener("change", addMarkers);

addMarkers();

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
  let league = document.getElementById("league-options").value;
  document.getElementById("leaguename").textContent = league;
  let stadiums = await getStadiums();
  let leagueStadiums = stadiums.stadiums.filter((s) => s.league == league);
  console.log(stadiums);
  console.log(leagueStadiums);

  let longitudes = leagueStadiums.map((s) => s.lng);
  let latitudes = leagueStadiums.map((s) => s.lat);

  console.log(longitudes);
  console.log(latitudes);

  let bounds = [
    [Math.min(...latitudes), Math.min(...longitudes)], // Southwest corner
    [Math.max(...latitudes), Math.max(...longitudes)], // Northeast corner
  ];
  console.log(bounds);

  map.fitBounds(bounds, { padding: [30, 30] });

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

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

    let markerClass = `${league.toLowerCase().replace(/\s+/g, "-")}-${division.toLowerCase().replace(/\s+/g, "-")}`;
    console.log(markerClass);
    marker._icon.classList.add(markerClass);
  }
}
