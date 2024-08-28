/*!
    Script Name: Cytoscape Visualization for Plant Dashboard
    Description: This script is responsible for initializing and updating the Cytoscape graph visualization 
    on the Plant Dashboard. It fetches asset mapping data based on a 'lineId' query parameter, sets up 
    the graph with appropriate styles and layouts, and periodically refreshes the data every 2 minutes 
    to ensure the display is current. The script provides basic controls for zooming and fitting the graph
    within the view.

    Features:
    - Fetches initial graph data using a lineId from URL parameters.
    - Refreshes graph data every 2 minutes to keep the display updated.
    - Provides user controls for zooming in, zooming out, fitting to screen, and resetting zoom.
    - Dynamically adds and removes elements to the Cytoscape graph without page reload.

    Dependencies:
    - Cytoscape.js: Utilizes Cytoscape.js for rendering graph-based visualizations.
    - MES_UI API: Depends on the `/system/webdev/mes_ui/getAssetMapData` API to fetch visualization data.

    Usage:
    - Include this script in the HTML file where the Cytoscape graph is to be displayed.
    - Ensure the container div with id 'cy' is present in the HTML for the Cytoscape graph to bind to.

    Initials ... Date ... Change #
    BD ... 08/27/2024 ... Initial Creation

    Future Enhancements:
    - Implement error handling for network issues during data fetch.
    - Add more user controls for different types of graph layouts.
    - Consider adding a loading indicator while fetching data.
*/

var cy; // Make cy accessible throughout the script
var staticData = [
  // Each node is defined with a label, a unique ID, and a starting position.
  // The positions are arbitrary and can be adjusted to better reflect your layout requirements.
  {
    data: { id: "multiWickCutter", label: "MultiWick Cutter" },
    position: { x: 100, y: 50 },
  },
  {
    data: { id: "labellerSideCLP", label: "Labeller Side CLP" },
    position: { x: 200, y: 50 },
  },
  {
    data: { id: "labellerUPC", label: "Labeller UPC" },
    position: { x: 300, y: 50 },
  },
  {
    data: { id: "spiderRobot", label: "Spider Robot" },
    position: { x: 400, y: 50 },
  },
  {
    data: { id: "visionSystemWICK", label: "Vision System WICK" },
    position: { x: 500, y: 50 },
  },
  {
    data: { id: "visionSystemLID", label: "Vision System LID" },
    position: { x: 600, y: 50 },
  },
  {
    data: { id: "visionSystemPULP", label: "Vision System PULP" },
    position: { x: 700, y: 50 },
  },
  {
    data: { id: "denesterLower", label: "Denester Lower" },
    position: { x: 800, y: 50 },
  },
  {
    data: { id: "denesterUpper", label: "Denester Upper" },
    position: { x: 900, y: 50 },
  },
  {
    data: { id: "caseErector", label: "Case Erector" },
    position: { x: 1000, y: 50 },
  },
  {
    data: { id: "caseSealer", label: "Case Sealer" },
    position: { x: 1100, y: 50 },
  },
  {
    data: { id: "palletizer", label: "Palletizer" },
    position: { x: 1200, y: 50 },
  },
  { data: { id: "filler", label: "Filler" }, position: { x: 100, y: 150 } },
  {
    data: { id: "wickCutter", label: "Wick Cutter" },
    position: { x: 200, y: 150 },
  },
  {
    data: { id: "wickCutter2", label: "Wick Cutter 2" },
    position: { x: 300, y: 150 },
  },
  {
    data: { id: "jarLineC", label: "Jar Line C" },
    position: { x: 400, y: 150 },
  },
  {
    data: { id: "depaletizer", label: "Depaletizer" },
    position: { x: 500, y: 150 },
  },
  {
    data: { id: "wickCutter", label: "Wick Cutter" },
    position: { x: 300, y: 150 },
  },
  {
    data: { id: "topping", label: "Topping" },
    position: { x: 400, y: 150 },
  },
  {
    data: { id: "coolilngBelts", label: "Cooling Belts" },
    position: { x: 500, y: 150 },
  },
];

document.addEventListener("DOMContentLoaded", function () {
  setupCytoscape(staticData); // Setup Cytoscape with static data
});

function setupCytoscape(elements) {
  cy = cytoscape({
    container: document.getElementById("cy"),
    elements: elements,
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#666",
          label: "data(label)",
          color: "white",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": "10px",
        },
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "#ccc",
        },
      },
    ],
    layout: {
      name: "preset",
    },
  });
}

function zoomIn() {
  if (cy) cy.zoom(cy.zoom() * 1.1);
  if (cy) cy.center();
}

function zoomOut() {
  if (cy) cy.zoom(cy.zoom() * 0.9);
  if (cy) cy.center();
}

function fit() {
  if (cy) cy.fit();
}

function resetZoom() {
  if (cy) {
    cy.zoom(1); // Resets zoom level to 1
    cy.center();
  }
}

function logPositions() {
  var positions = cy.nodes().map((node) => ({
    data: {
      id: node.id(),
      label: node.data("label"),
    },
    position: {
      x: node.position("x"),
      y: node.position("y"),
    },
  }));
  console.log(JSON.stringify(positions, null, 2)); // Pretty print the positions
}
