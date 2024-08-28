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
  {
    data: {
      id: "multiWickCutter",
      label: "MultiWick Cutter",
    },
    position: {
      x: 112.40405117270791,
      y: -24.42430703624734,
    },
  },
  {
    data: {
      id: "labellerSideCLP",
      label: "Labeller Side CLP",
    },
    position: {
      x: 429.474946695096,
      y: -21.32329424307037,
    },
  },
  {
    data: {
      id: "labellerUPC",
      label: "Labeller UPC",
    },
    position: {
      x: 513.9698827292109,
      y: -20.08288912579959,
    },
  },
  {
    data: {
      id: "spiderRobot",
      label: "Spider Robot",
    },
    position: {
      x: 728.707356076759,
      y: -22.563699360341158,
    },
  },
  {
    data: {
      id: "visionSystemWICK",
      label: "Vision System WICK",
    },
    position: {
      x: 352.39179104477614,
      y: 76.04850746268656,
    },
  },
  {
    data: {
      id: "visionSystemLID",
      label: "Vision System LID",
    },
    position: {
      x: 846.840618336887,
      y: -21.323294243070368,
    },
  },
  {
    data: {
      id: "visionSystemPULP",
      label: "Vision System PULP",
    },
    position: {
      x: 695.6585820895522,
      y: 149.85261194029852,
    },
  },
  {
    data: {
      id: "denesterLower",
      label: "Denester Lower",
    },
    position: {
      x: 785.7353411513859,
      y: 174.6607142857143,
    },
  },
  {
    data: {
      id: "denesterUpper",
      label: "Denester Upper",
    },
    position: {
      x: 955.8182302771854,
      y: -21.943496801705763,
    },
  },
  {
    data: {
      id: "caseErector",
      label: "Case Erector",
    },
    position: {
      x: 697.3411513859274,
      y: 206.29104477611938,
    },
  },
  {
    data: {
      id: "caseSealer",
      label: "Case Sealer",
    },
    position: {
      x: 1071.4706823027718,
      y: -23.804104477611947,
    },
  },
  {
    data: {
      id: "palletizer",
      label: "Palletizer",
    },
    position: {
      x: 1180.7737206823028,
      y: -21.943496801705763,
    },
  },
  {
    data: {
      id: "filler",
      label: "Filler",
    },
    position: {
      x: 578.1761727078891,
      y: 345.98400852878467,
    },
  },
  {
    data: {
      id: "wickCutter",
      label: "Wick Cutter",
    },
    position: {
      x: 356.91124733475476,
      y: 136.3555437100213,
    },
  },
  {
    data: {
      id: "wicker",
      label: "Wicker",
    },
    position: {
      x: 906.3060596756619,
      y: 320.902347675953,
    },
  },
  {
    data: {
      id: "wicker2",
      label: "Wicker 2",
    },
    position: {
      x: 910.6689934237718,
      y: 415.0170613851761,
    },
  },
  {
    data: {
      id: "jarLineC",
      label: "Jar Line C",
    },
    position: {
      x: 1102.6894989339019,
      y: 119.61007462686568,
    },
  },
  {
    data: {
      id: "depaletizer",
      label: "Depaletizer",
    },
    position: {
      x: 1127.0247867803837,
      y: 376.37393390191903,
    },
  },
  {
    data: {
      id: "topping",
      label: "Topping",
    },
    position: {
      x: 116.56743070362468,
      y: 102.24440298507463,
    },
  },
  {
    data: {
      id: "coolingBelts",
      label: "Cooling Belts",
    },
    position: {
      x: 117.95522388059692,
      y: 161.16364605543706,
    },
  },
];

staticData.push(
  { data: { id: "edge1", source: "depaletizer", target: "wicker" } },
  { data: { id: "edge2", source: "depaletizer", target: "wicker2" } },
  { data: { id: "edge3", source: "wicker2", target: "filler" } },
  { data: { id: "edge4", source: "wicker", target: "filler" } },
  { data: { id: "edge5", source: "coolingBelts", target: "topping" } },
  { data: { id: "edge6", source: "filler", target: "coolingBelts" } },
  { data: { id: "edge7", source: "topping", target: "multiWickCutter" } },
  {
    data: { id: "edge8", source: "multiWickCutter", target: "labellerSideCLP" },
  },

  // Add more edges as necessary
);

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
          "target-arrow-shape": "triangle", // Ensures the arrow shape is a triangle at the target end
          "target-arrow-color": "#ccc", // Sets the color of the arrow
          "curve-style": "bezier", // Ensures the edge has a slight curve which can help display arrowheads more clearly
          "arrow-scale": 2, // Optionally increase the size of the arrowhead if it's too small
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
