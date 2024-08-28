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

const staticData = [
  {
    data: {
      id: "depaletizer",
      label: "Depaletizer",
    },
    position: {
      x: 1461.4707968781638,
      y: 835.1919896825835,
    },
    classes: [],
  },
  {
    data: {
      id: "wickerArea",
      label: "Wicker Area",
    },
    position: {
      x: 1291.0043238857816,
      y: 834.5004421248051,
    },
    classes: ["compound"],
  },
  {
    data: {
      id: "wicker1",
      label: "Wicker 1",
      parent: "wickerArea",
    },
    position: {
      x: 1289.967002549114,
      y: 790.9329459847642,
    },
    classes: [],
  },
  {
    data: {
      id: "wicker2",
      label: "Wicker 2",
      parent: "wickerArea",
    },
    position: {
      x: 1292.0416452224492,
      y: 878.067938264846,
    },
    classes: [],
  },
  {
    data: {
      id: "filler",
      label: "Filler",
    },
    position: {
      x: 925.5214395998833,
      y: 819.2863958536798,
    },
    classes: [],
  },
  {
    data: {
      id: "beltsArea",
      label: "Belts Area",
    },
    position: {
      x: 331.48208746821456,
      y: 568.9461799378894,
    },
    classes: ["compound"],
  },
  {
    data: {
      id: "coolingBelts",
      label: "Cooling Belts",
      parent: "beltsArea",
    },
    position: {
      x: 331.48208746821456,
      y: 523.3040411245131,
    },
    classes: [],
  },
  {
    data: {
      id: "topping",
      label: "Topping",
      parent: "beltsArea",
    },
    position: {
      x: 331.4820874682147,
      y: 614.5883187512655,
    },
    classes: [],
  },
  {
    data: {
      id: "multiWickCutter",
      label: "Multi Wick Cutter",
    },
    position: {
      x: 346.6961337393404,
      y: 369.7804832977025,
    },
    classes: [],
  },
  {
    data: {
      id: "labelerArea",
      label: "Labler Area",
    },
    position: {
      x: 674.4215219421451,
      y: 368.7253416661474,
    },
    classes: ["compound"],
  },
  {
    data: {
      id: "labelerSideCLP",
      label: "labeler Side CLP",
      parent: "labelerArea",
    },
    position: {
      x: 734.5405039980457,
      y: 369.0532951501492,
    },
    classes: [],
  },
  {
    data: {
      id: "labelerUPC",
      label: "labeler UPC",
      parent: "labelerArea",
    },
    position: {
      x: 599.8025398862445,
      y: 368.3973881821457,
    },
    classes: [],
  },
  {
    data: {
      id: "spiderRobot",
      label: "Spider Robot",
    },
    position: {
      x: 930.8106817120249,
      y: 379.7046741793926,
    },
    classes: [],
  },
  {
    data: {
      id: "visionSystemLID",
      label: "Vision System LID",
    },
    position: {
      x: 1068.8622519528121,
      y: 378.3693341910556,
    },
    classes: [],
  },
  {
    data: {
      id: "denesterUpper",
      label: "Denester Upper",
    },
    position: {
      x: 1203.690560328484,
      y: 380.41474505461844,
    },
    classes: [],
  },
  {
    data: {
      id: "caseSealer",
      label: "Case Sealer",
    },
    position: {
      x: 1342.6218049687259,
      y: 382.4116977684014,
    },
    classes: [],
  },
  {
    data: {
      id: "Palletizer",
      label: "Palletizer",
    },
    position: {
      x: 1460.042235346237,
      y: 379.72890325428244,
    },
    classes: [],
  },
  {
    data: {
      id: "wickCutterArea",
      label: "Wicker Cutter Area",
    },
    position: {
      x: 644.9379569438851,
      y: 560.4836388183004,
    },
    classes: ["compound"],
  },
  {
    data: {
      id: "visionSystemWick",
      label: "Vision System Wick",
      parent: "wickCutterArea",
    },
    position: {
      x: 644.9379569438851,
      y: 523.1995146291683,
    },
    classes: [],
  },
  {
    data: {
      id: "wickCutter",
      label: "Wickcutter",
      parent: "wickCutterArea",
    },
    position: {
      x: 644.2857774612571,
      y: 597.7677630074324,
    },
    classes: [],
  },
  {
    data: {
      id: "visionSystemArea",
      label: "Vision System Area",
    },
    position: {
      x: 1011.5408282315254,
      y: 559.7905185531727,
    },
    classes: ["compound"],
  },
  {
    data: {
      id: "visionSystemPulp",
      label: "Vision System Pulp",
      parent: "visionSystemArea",
    },
    position: {
      x: 970.0839054823163,
      y: 522.6162880433822,
    },
    classes: [],
  },
  {
    data: {
      id: "caseErector",
      label: "Case Erector",
      parent: "visionSystemArea",
    },
    position: {
      x: 971.3882644475722,
      y: 596.9647490629633,
    },
    classes: [],
  },
  {
    data: {
      id: "denesterLower",
      label: "Denester Lower",
      parent: "visionSystemArea",
    },
    position: {
      x: 1063.9977509807347,
      y: 561.7470570010564,
    },
    classes: [],
  },
  {
    data: {
      id: "depaletizerToWicker",
      source: "depaletizer",
      target: "wickerArea",
    },
  },
  {
    data: {
      id: "wickerAreaToFiller",
      source: "wickerArea",
      target: "filler",
    },
  },
  {
    data: {
      id: "fillerToBeltsArea",
      source: "filler",
      target: "beltsArea",
    },
  },
  {
    data: {
      id: "beltsAraToMultiWickerCutter",
      source: "beltsArea",
      target: "multiWickCutter",
    },
  },
  {
    data: {
      id: "multiWickCutterToLablerArea",
      source: "multiWickCutter",
      target: "labelerArea",
    },
  },
  {
    data: {
      id: "beltsAreaToWickCutterArea",
      source: "beltsArea",
      target: "wickCutterArea",
    },
  },
  {
    data: {
      id: "wickerCutterAreaToBeltsArea",
      source: "wickCutterArea",
      target: "beltsArea",
    },
  },
  {
    data: {
      id: "visionSystemAreaToSpiderRobot",
      source: "visionSystemArea",
      target: "spiderRobot",
    },
  },
  {
    data: {
      id: "spiderRobotToVisionSystem",
      source: "spiderRobot",
      target: "visionSystemLID",
    },
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
