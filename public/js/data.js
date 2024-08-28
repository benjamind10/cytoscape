export const staticData = [
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
