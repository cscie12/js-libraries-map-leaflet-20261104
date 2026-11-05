# Leaflet Map Examples

Examples of interactive maps made with [Leaflet](https://leafletjs.com/), a JavaScript library for maps.

These examples use plain HTML, CSS, and JavaScript. There's no build step and nothing to install.

## The examples

The examples go from simplest to most complex. Each one builds on the one before it.

| Example | Files | What it shows |
| --- | --- | --- |
| **Harvard Yard** | `harvard-yard.html`, `scripts/harvard-yard.js` | The basics: create a map, add map tiles, and add one marker with a popup. |
| **MLB Stadiums** | `stadiums-mlb.html`, `scripts/stadiums-mlb.js` | Load data from a JSON file with `fetch`, add a marker for each stadium, fit the map to all the markers, and color markers by division with CSS. Leaflet is loaded from a CDN. |
| **NHL Stadiums** | `stadiums-nhl.html`, `scripts/stadiums-nhl.js` | The same approach for the NHL, with Leaflet loaded from a local copy in `vendor/` instead of a CDN. |
| **Select a League** | `stadiums.html`, `scripts/stadiums.js` | Choose a league from a `<select>` menu, and the markers and map view update to match. |

Start at `index.html`, which links to all four examples.

### Other files

- `styles/main.css`: page styles, the map's height, and the marker colors for each division
- `data/stadiums.json`: the stadium data (team, league, division, latitude, longitude), from [logandonaldson on Kaggle](https://www.kaggle.com/datasets/logandonaldson/sports-stadium-locations)
- `vendor/leaflet-1.9.4/`: a local copy of Leaflet, used by the NHL example

## Viewing the examples

1. Clone or download this repository.
2. Open the folder in VS Code.
3. Install the **Live Server** extension if you don't already have it.
4. Right-click `index.html` and choose **Open with Live Server**.

### Why use Live Server?

If you double-click an HTML file, the browser opens it from your disk, and the address starts with `file://`. The stadium examples won't work that way:

- They use `fetch()` to load `data/stadiums.json`, and browsers block `fetch()` for `file://` pages.
- They load their JavaScript with `<script type="module">`, which also needs a web server.

Live Server runs a small web server on your computer, so the pages work the same way they would on a real website. As a bonus, the page reloads automatically when you save a file.

## Exploring the code

- Each HTML and JS file has short comments explaining what each part does.
- Open the browser's developer tools and look at the **Console**. The stadium scripts use `console.log()` to show the data at each step.
- Try changing things: the starting location and zoom in `harvard-yard.js`, the league in `stadiums-mlb.js`, or the marker colors in `main.css`.
- For more detail, see the [Leaflet documentation](https://leafletjs.com/reference.html) and [tutorials](https://leafletjs.com/examples.html).
