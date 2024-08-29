/*!
    Script Name: Cytoscape Visualization for Plant Dashboard
    Description: This script is responsible for initializing and updating the Cytoscape graph visualization 
    on the Plant Dashboard. It fetches asset mapping data based on a 'lineId' query parameter, sets up 
    the graph with appropriate styles and layouts.

    Features:
    - Fetches initial graph data using a lineId from URL parameters.
    - Provides user controls for zooming in, zooming out, fitting to screen, and resetting zoom.
    - Dynamically adds and removes elements to the Cytoscape graph.

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
*/

var cy; // Cytoscape instance variable
const staticData = {
  edges: [
    {
      data: {
        source: 1,
        target: 3,
        id: "1to3",
      },
    },
  ],
  areas: [
    {
      data: {
        label: "Test Area",
        id: 5,
      },
      classes: [],
      position: {
        x: 1461.4707968781638,
        y: 826.1919896825835,
      },
    },
  ],
  nodes: [
    {
      data: {
        parent: 5,
        eqPath: "GPA/Virginia/Mixing/Mixer 1/Drum",
        label: "Drum",
        id: 1,
      },
      classes: [],
      position: {
        x: 1461.4707968781638,
        y: 835.1919896825835,
      },
    },
    {
      data: {
        parent: null,
        eqPath: "GPA/Virginia/Mixing/Mixer 1/Sweeper",
        label: "Sweeper",
        id: 3,
      },
      classes: [],
      position: {
        x: 624.3923759479773,
        y: 794.3089897305413,
      },
    },
    {
      data: {
        parent: null,
        eqPath: "GPA/Virginia/Mixing/Mixer 1/PatrickTest",
        label: "PatrickTest",
        id: 4,
      },
      classes: [],
      position: {
        x: 640.114431119948,
        y: 383.8783597551429,
      },
    },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  setupCytoscape(staticData); // Setup Cytoscape with static data
});

// Function to initialize Cytoscape and set up event listeners
function setupCytoscape(data) {
  const elements = [...data.nodes, ...data.edges, ...data.areas];
  cy = cytoscape({
    container: document.getElementById("cy"),
    elements: elements,
    style: getCytoscapeStyles(),
    layout: {
      name: "preset", // Uses preset layout with predefined positions
    },
  });

  // Event listener for node click to fetch metrics and display modal
  cy.on("tap", "node", function (evt) {
    const node = evt.target;
    const eqPath = node.data("eqPath");

    // Fetch data from the endpoint using eqPath (Commented out for testing)
    /*
    fetch(`/system/webdev/mes_gateway/cytoscape/routes/getmetrics?eqPath=${encodeURIComponent(eqPath)}`)
      .then((response) => response.json())
      .then((data) => {
        showModal(data); // Call function to display the modal with fetched data
      })
      .catch((error) => {
        console.error("Error fetching metrics:", error);
      });
    */

    // Hardcoded data for testing outside Ignition
    const testData = {
      state: "E-Stop",
      oee: 0,
      a: 0.5953608155250549,
      q: 0,
      p: 0,
    };

    showModal(testData); // Use hardcoded data to test the modal
  });
}

// Function to get Cytoscape styles
function getCytoscapeStyles() {
  return [
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(label)",
        color: "white",
        "text-valign": "center",
        "text-halign": "center",
        "font-size": "14px",
        "text-margin-y": -25,
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
        "arrow-scale": 1,
      },
    },
    {
      selector: ".compound", // Specific style for compound nodes
      style: {
        "background-opacity": 0.2,
        "background-color": "#FFFFFF",
      },
    },
  ];
}

// Function to show modal with metrics data
function showModal(data) {
  let modal = document.getElementById("metricsModal");

  // Create modal structure if it doesn't exist
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "metricsModal";
    modal.style = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: grey;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      z-index: 1000;
    `;
    document.body.appendChild(modal);
  }

  // Populate modal with data
  modal.innerHTML = `
    <h3>Metrics</h3>
    <p><strong>State:</strong> ${data.state}</p>
    <p><strong>OEE:</strong> ${data.oee}</p>
    <p><strong>Availability (A):</strong> ${data.a}</p>
    <p><strong>Quality (Q):</strong> ${data.q}</p>
    <p><strong>Performance (P):</strong> ${data.p}</p>
    <button onclick="closeModal()">Close</button>
  `;

  // Show the modal
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("metricsModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Utility functions for graph controls
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

// Function to log current node positions for debugging
function logPositions() {
  const positions = cy.nodes().map((node) => ({
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
