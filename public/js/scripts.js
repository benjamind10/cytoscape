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
import { staticData } from "./data.js";
console.log(staticData);

var cy; // Make cy accessible throughout the script
document.addEventListener("DOMContentLoaded", function () {
  setupCytoscape(staticData); // Setup Cytoscape with static data
});

function setupCytoscape(elements) {
  cy = cytoscape({
    container: document.getElementById("cy"),
    elements: elements,
    style: [
      // Just define the style array directly here without assignment
      {
        selector: "node",
        style: {
          "background-color": "#666",
          label: "data(label)",
          color: "white",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": "14px",
          "text-margin-y": -25, // Uncommented and adjusted to make label appear above the node
        },
      },
      {
        selector: "$node > node", // Style for child nodes
        style: {
          "padding-top": "10px",
          "padding-left": "10px",
          "padding-bottom": "10px",
          "padding-right": "10px",
          "text-valign": "top",
          "text-halign": "center",
          "background-color": "#999",
        },
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "#ccc",
          "curve-style": "bezier",
          "arrow-scale": 1, // Adjust the scale if the arrowhead is too small or too large
        },
      },
      {
        selector: ".compound", // Specific style for compound nodes
        style: {
          "background-opacity": 0.2,
          "background-color": "#FFFFFF",
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
      parent: node.data("parent"),
    },
    position: {
      x: node.position("x"),
      y: node.position("y"),
    },
    classes: node.classes(),
  }));
  console.log(JSON.stringify(positions, null, 2)); // Pretty print the positions
}

// NEEDED FOR IGNITION
//document.addEventListener("DOMContentLoaded", function () {
//fetchData(); // Fetch initial data and setup Cytoscape
//setInterval(fetchData, 120000); // Refresh data every 2 minutes
//});

//function fetchData() {
//const lineId = new URLSearchParams(window.location.search).get("lineId"); // Assuming lineId is passed as a URL query parameter
//if (!lineId) {
//console.error("lineId query parameter is missing.");
//return;
//}
//fetch(`/system/webdev/mes_ui/getAssetMapData?lineId=${lineId}`)
//.then((response) => response.json())
//.then((data) => {
//if (cy) {
//cy.elements().remove(); // Remove current elements
//cy.add(data.elements); // Add new elements
//cy.style(data.styles); // Update styles if needed
//cy.layout({
//name: "preset",
//}).run();
//cy.fit(); // Fit new layout
//} else {
//setupCytoscape(data.elements, data.styles); // Setup if cy is not initialized
//}
//})
//.catch((error) => console.error("Error fetching data:", error));
//}
