/*!
    Script Name: Cytoscape Visualization for Plant Dashboard
    Description: This script initializes and updates the Cytoscape graph visualization on the Plant Dashboard.
    It fetches asset mapping data based on a 'lineId' query parameter, sets up the graph with appropriate 
    styles and layouts, and provides user controls for graph interaction.

    Features:
    - Fetches initial graph data using a lineId from URL parameters.
    - Provides user controls for zooming in, zooming out, fitting to screen, and resetting zoom.
    - Dynamically adds and removes elements to the Cytoscape graph.
    - Displays a modal with metrics when a node is clicked.

    Dependencies:
    - Cytoscape.js: A JavaScript library for rendering complex network graphs.
    - MES_UI API: Depends on the `/system/webdev/mes_gateway/cytoscape/routes/model` API to fetch visualization data.
    - `/system/webdev/mes_gateway/cytoscape/routes/getmetrics`: API to fetch node-specific metrics.

    Usage:
    - Include this script in the HTML file where the Cytoscape graph is to be displayed.
    - Ensure the container div with id 'cy' is present in the HTML for the Cytoscape graph to bind to.
    - Integrate with buttons for user interactions like zooming and resetting the graph view.

    Returns:
    - Interactive graph visualization with modal popups for node-specific metrics.

    Initials ... Date ... Change #
    BD ... 08/27/2024 ... Initial Creation
    BD ... 08/28/2024 ... Added metric fetching and modal display for nodes

    Future Enhancements:
    - Implement error handling for network issues during data fetch.
    - Add more user controls for different types of graph layouts.
    - Optimize performance for larger datasets.
*/

let cy; // Make cy accessible throughout the script

// Initializes the Cytoscape graph when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  fetchData(); // Fetch initial data and setup Cytoscape
});

// Fetches graph data based on the lineId query parameter
function fetchData() {
  const lineId = new URLSearchParams(window.location.search).get("lineId"); // Get lineId from URL parameters
  if (!lineId) {
    console.error("lineId query parameter is missing.");
    return;
  }
  fetch(`/system/webdev/mes_gateway/cytoscape/routes/model?lineId=${lineId}`)
    .then((response) => response.json())
    .then((data) => {
      setupCytoscape(data); // Setup Cytoscape with fetched data
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Initializes Cytoscape and sets up event listeners
function setupCytoscape(data) {
  const elements = [...data.nodes, ...data.edges, ...data.areas];
  cy = cytoscape({
    container: document.getElementById("cy"),
    elements: elements,
    style: getNodeStyles(),
    layout: {
      name: "preset",
    },
  });

  cy.ready(() => {
    // Delay the initial metrics update slightly to ensure all nodes are fully rendered
    setTimeout(() => {
      updateMetrics();
    }, 500); // Adjust the delay as needed

    // Set interval to update metrics every 5 minutes (300000 milliseconds)
    setInterval(updateMetrics, 300000);
  });

  // Event listener for node clicks to fetch and display metrics
  cy.on("tap", "node", function (evt) {
    const node = evt.target;
    const eqPath = node.data("eqPath");

    // Fetch metrics data from the endpoint using eqPath
    fetch(
      `/system/webdev/mes_gateway/cytoscape/routes/metrics?eqPath=${encodeURIComponent(
        eqPath,
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        showModal(data); // Display the modal with fetched data
      })
      .catch((error) => {
        console.error("Error fetching metrics:", error);
      });
  });
}

// Function to display a modal with metrics data
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
          background-color: #2c2f33; 
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          z-index: 1000;
          color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        `;
    document.body.appendChild(modal);
  }

  // Populate modal with data
  modal.innerHTML = `
    <h3>Metrics</h3>
    <p><strong>Name:</strong> ${data.name}</p>
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

// Zoom controls for the Cytoscape graph
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

// Logs the current positions of nodes to the console
function logPositions() {
  let positions = cy.nodes().map((node) => ({
    data: {
      id: node.id(),
      label: node.data("label"),
      parent: node.data("parent"),
      eqPath: node.data("eqPath"),
      lineId: node.data("lineId"),
    },
    position: {
      x: node.position("x"),
      y: node.position("y"),
    },
    classes: node.classes(),
  }));
  console.log(JSON.stringify(positions, null, 2)); // Pretty print the positions
}

function logNodes() {
  let data = cy.json();

  console.log(JSON.stringify(data, null, 2));
}

// Function to capture positions and send them to the backend
function savePositions() {
  // Capture positions of all nodes
  const positions = cy.nodes().map((node) => ({
    id: node.id(),
    x: node.position("x"),
    y: node.position("y"),
  }));

  // Send positions to the backend via a POST request
  fetch("/system/webdev/mes_gateway/cytoscape/routes/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(positions),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Positions updated successfully!");
        console.log("Positions saved successfully:", data.message);
      } else {
        console.error("Error saving positions:", data.message);
        alert("Error updating positions. Please try again.");
      }
    })
    .catch((error) => console.error("Error sending positions:", error));
}

function updateMetrics() {
  if (!cy) {
    console.error("Cytoscape instance is not initialized.");
    return;
  }

  // Extract eqPaths from all nodes on the screen
  const eqPaths = cy
    .nodes()
    .filter((node) => node.data("eqPath")) // Ensure nodes have eqPath
    .map((node) => ({ eqPath: node.data("eqPath") })); // Map to objects

  if (eqPaths.length === 0) {
    console.log("No valid eqPaths found. Skipping update.");
    return;
  }

  // Send the extracted eqPaths to the backend
  fetch("/system/webdev/mes_gateway/cytoscape/routes/metrics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eqPaths }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.metrics && data.metrics.length) {
        data.metrics.forEach((metric, index) => {
          const node = cy
            .nodes()
            .filter((n) => n.data("eqPath") === eqPaths[index].eqPath)[0];
          if (node && metric && metric[0].oee !== undefined) {
            // Check for valid metric and OEE
            // Update the node's label with the new OEE value
            const newLabel = `${metric[0].name || node.data("originalLabel")}\n\nOEE: ${metric[0].oee}%`;
            node.data("label", newLabel);

            // Update background color based on the state
            //            const newStateColor = metric[0].state !== "Running" ? "#ff0000" : "#008a00";
            const newStateColor = metric[0].stateColor;
            node.style({ "background-color": newStateColor });

            // Dynamically update the background image based on the state icon
            if (metric[0].stateIcon) {
              const iconName = metric[0].stateIcon.split("/").pop();
              const newIconPath = `/system/webdev/mes_gateway/cytoscape/assets/${iconName}.svg`;
              node.style({ "background-image": `url('${newIconPath}')` });
            }
          }
        });
        cy.style().update(); // Apply style updates to the graph
        console.log("Metrics successfully updated.");
      } else {
        console.error("Error or empty metrics returned:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching metrics:", error);
    });
}

function measureText(text, fontSize) {
  let measurer = document.getElementById("text-measurer");
  measurer.style.fontSize = fontSize; // Use actual font size intended for display
  measurer.textContent = text;
  return measurer.offsetWidth * 0.5; // Apply scaling factor here if needed consistently
}

function getNodeStyles() {
  return [
    {
      selector: "node",
      style: {
        shape: "round-rectangle",
        "background-color": "#008a00",
        "border-color": "#005700",
        "border-width": 2,
        "border-opacity": 1,
        "border-radius": "20px",
        "text-valign": "center",
        "text-halign": "center",
        padding: "10px",
        "font-size": "20px",
        label: "data(label)",
        "text-wrap": "wrap",
        color: "#ffffff",
        "font-weight": "bold",
        width: function (ele) {
          const text = `${ele.data("label")}\nOEE: ${ele.data("oee") || "N/A"}%`;
          return Math.max(100, measureText(text, "20")) + "px";
        },
        height: "70px",
        //        "background-image": "url('')",
        "background-width": "20px",
        "background-height": "20px",
        "background-position-x": "100%",
        "background-position-y": "0%",
        "background-repeat": "no-repeat",
      },
    },
    {
      selector: "$node > node", // This selects compound (parent) nodes
      style: {
        "background-image": "none",
        "background-color": "#f2f2f2",
        "background-opacity": 0.5,
        "border-color": "#ccc",
        "border-width": 2,
        padding: "10px",
        label: "",
        "font-size": "20px",
        "text-margin-y": -20,
        color: "white",
        "font-weight": "bold",
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
  ];
}
