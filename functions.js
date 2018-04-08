const q = a => document.querySelector(a);
const qq = a => Array.from(document.querySelectorAll(a));

// FUNCTIONS
// ----------------------------------------------------------------------------------------

function deleteNodeTree(myNode) {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

const addPoint = (x, y) => {
  f('addPoint');
  var funcs = { circle: circleTo, move: moveTo, line: lineTo };
  funcs[svgState.drawMode](x, y);

  // I cant remember why I wrote this!
  svgState.drawMode === 'line';
};

const addPath = function(e) {
  f('addPath');
  var y = e.target.getAttribute('cy'),
    x = e.target.getAttribute('cx');
  if (x === null || y === null) {
    console.log('No Gridpoint picked. null:', x, y);
    return;
  }
  addPoint(x, y);
  update();
};

const circleTo = function(x, y) {
  f('circleTo');
  let rx = +svgState.radius * gridTic;
  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  svgState.commands.push('A ' + rx + ',' + rx + '   0 0 1 ' + x + ',' + y);
  svgState.drawMode = 'line';
  update();
};

function moveTo(x, y) {
  f('moveTo');
  svgState.commands.push('M ' + x + ',' + y);
  svgState.drawMode = 'line';
  update();
}

function lineTo(x, y) {
  f('lineTo');
  svgState.commands.push('L' + x + ',' + y);
  update();
}

const jsClearBackground = function(e) {
  f('jsClearBackground');
  document.querySelector('image').classList.toggle('hidden');
  update();
};

function updateSvgLineWidth() {
  f('updateSvgLineWidth');
  var width = q('#rangeinput').value;
  q('#rangevalue').value = width;
  svgState.width = +width;
  update();
}

function updateRadius() {
  f('updateRadius');
  var radius = q('#rangeinputRadius').value;
  q('#rangevalueRadius').value = radius;
  svgState.radius = +radius;
  update();
}

function updateGridSpace() {
  f('updateGridSpace');
  gridTic = +q('#rangeinputGridSpace').value;
  q('#rangevalueGridSpace').value = gridTic;
  createGrid(gridTic);
  addNodeHoverFunction('circle', svgState, resetAll);
  removeNodeHoverFunction('circle', svgState, resetAll);
  update();
}

function updateTextArea() {
  f('updateTextArea');

  var svgTextd = svgState.commands.join(' ');
  var pathWidth = svgState.width;
  var codeSVGstring =
    '' +
    '<svg id="" class="" viewBox="0 0 80 80"> ' +
    '<path stroke="black" stroke-width=' +
    pathWidth +
    ' fill= "none"' +
    ' stroke-linecap="butt"' +
    ' stroke-linejoin="miter"' +
    ' d="' +
    svgTextd +
    '"/></svg>';
  q('#textarea1').value = codeSVGstring;
  q('#codeArea').textContent = formatSVGcode(codeSVGstring);
}

function formatSVGcode(svgText) {
  return svgText
    .split('<')
    .join('\n<')
    .split('/>')
    .join('\n/>')
    .split('M')
    .join('\n      M ')
    .split('L')
    .join('\n      L ')
    .split('A')
    .join('\n      A ');
}
function undo() {
  f('undo');
  console.log(svgState.commands);
  svgState.commands.pop();
  update();
}

function resetAll() {
  f('resetAll');

  q('#svg-icon path').setAttribute('d', '');
  q('#outputSVG path').setAttribute('d', '');
  q('#textarea1').value = '';
  q('#codeArea').innerText = '';
}

function updateSVG(svgPath, svgCommands, width) {
  f('updateSVG');
  var svg1 = q(svgPath);
  try {
    svg1.setAttribute('d', svgCommands);
    svg1.setAttribute('stroke-width', width);
  } catch(error) {
    console.log('catch hover line doesnt cross grid intersection',error);
  }
}

function update() {
  f('update');
  resetAll();
  var width = q('#rangeinput').value;
  var svgCommands = svgState.commands.join(' ');
  // console.log(svgCommands)
  if (svgCommands.length > 2) {
    updateSVG('#svg-icon path', svgCommands, width);
    updateSVG('#outputSVG path', svgCommands, width);
  }
  updateTextArea();
}

const clearAll = () => {
  f('clearAll');

  svgState.commands = ['M'];
  update();
  // console.log("clea: ", svgState.commands)
};

const toModeCircle = () => {
  f('toModeCircle');

  svgState.drawMode = 'circle';
  update();
  // console.log("clea: ", svgState.commands)
};

const toModeMove = () => {
  f('toModeMove');

  svgState.drawMode = 'move';
  update();
  // console.log("clea: ", svgState.commands)
};

// // function last(arr){
//   return arr[arr.length - 1];
// }

// logging. Set which functions are console.logged when run
function f(fName) {
  var functionNames = {
    // addPath: true,
    // circleTo: true,
    // jsClearBackground: true,
    deleteNodeTree: true
    // moveTo: true,
    // lineTo: true,
    // updateSvgLineWidth: true,
    // updateRadius: true,
    // updateGridSpace: true,
    // updateTextArea: true,
    // undo: true,
    // resetAll: true,
    // updateSVG: true,
    // update: true
  };
  if (functionNames[fName]) {
    console.log('f: ', fName);
  }
}
