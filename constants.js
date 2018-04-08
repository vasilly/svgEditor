const svgState = {
  width: 2,
  commands: [],
  drawMode: "move", //circle,
  radius: "1" //keep same as range input radius default
};


let gridMax = 80;
let gridTic = 10; // 0.25 for fine grid
let lightLineWidth = 0.05; //0.05 for fine grid
let heavyLineWidth = 0.1;

// Not used
const addText =
  typeof document.body.innerText == "undefined" ? "innerHTML" : "innerText";
