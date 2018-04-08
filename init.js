
// draw svg grid
updateGridSpace();

// add eventListeners
[
  { selector: ".grid", type: "click", func: addPath },
  { selector: ".clear", type: "click", func: clearAll },
  { selector: ".moveTo", type: "click", func: toModeMove },
  { selector: ".undo", type: "click", func: undo },
  { selector: ".btn-circle", type: "click", func: toModeCircle },
  { selector: ".jsClearBackground", type: "click", func: jsClearBackground },
  { selector: "#rangeinput", type: "change", func: updateSvgLineWidth },
  { selector: "#rangeinputRadius", type: "change", func: updateRadius },
  { selector: "#rangeinputGridSpace", type: "change", func: updateGridSpace }
].forEach(({selector, type, func}) =>
  q(selector).addEventListener(type, func, {
    passive: true
  })
);
