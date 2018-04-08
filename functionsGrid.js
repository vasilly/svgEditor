function createSVGline(x1, y1, x2, y2, width= 0.25, colour="black") {
  //
  f("createSVGline");
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke-width", width);
  line.setAttribute("stroke", colour);
  q("#svg-grid").appendChild(line);
}

function createGrid(strGridTic) {
  const gridTic = +strGridTic;
  deleteNodeTree(q("#svg-grid"));
  // draw light lines
  for (var xy = 0; xy < gridMax; xy += gridTic) {
    //draw horizontal
    createSVGline(0, xy, gridMax, xy, lightLineWidth, "grey");
    //draw vertical
    createSVGline(xy, 0, xy, gridMax, lightLineWidth, "grey");
  }

  // draw heavy lines
  let heavyGridSpace = 4 * gridTic;
  let heavyGridLines  = [
    heavyGridSpace,
    80 / 2,
    80 - heavyGridSpace
  ];
  if (gridTic < 4) {
    heavyGridLines = [
      heavyGridSpace,
      2 * heavyGridSpace,
      80 / 2,
      80 - 2 * heavyGridSpace,
      80 - heavyGridSpace
    ];
  }
  heavyGridLines.forEach(function(xy) {
    //draw horizontal
    createSVGline(0, xy, gridMax, xy, heavyLineWidth, "darkblue");
    //draw vertical
    createSVGline(xy, 0, xy, gridMax, heavyLineWidth, "darkblue");
  });
  // draw diagnals
  createSVGline(0, 0, gridMax, gridMax, heavyLineWidth, "darkblue");
  createSVGline(gridMax, 0, 0, gridMax, heavyLineWidth, "darkblue");

  // draw svg circles on hover
  for (var y = 0; y <= gridMax; y += gridTic)
    for (var x = 0; x <= gridMax; x += gridTic) {
      //<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      var circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", gridTic/2);
      q("#svg-grid").appendChild(circle);
    }
}
