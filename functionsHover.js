function addNodeHoverFunction(circleClassName, svgState, resetAll) {
  circles = qq(circleClassName);
  circles.forEach((circ, i) =>
    circ.addEventListener(
      "mouseover",
      function(event) {
        var x = event.target.getAttribute("cx");
        var y = event.target.getAttribute("cy");
        var tentativeLine = " ";

        // if (!x || !y) {
        //   return false;
        // }
        if (svgState.drawMode === "move") {
          return false;
        }

        if (svgState.drawMode === "line") {
          tentativeLine += x + "," + y;
        }

        if (svgState.drawMode === "circle") {
          let rx = +svgState.radius * gridTic;
          tentativeLine +=
            "A " +
            rx +
            "," +
            rx +
            "   0 0 1 " +
            x +
            "," +
            y +
            "M" +
            x +
            "," +
            y;
        }

        var width = q("#rangeinput").value;
        var svgCommands = svgState.commands.join(" ");
        svgCommandsTemp = svgCommands + tentativeLine;

        if (svgCommands.length > 2) {
          updateSVG("#svg-icon path", svgCommandsTemp, width);
          updateSVG("#outputSVG path", svgCommands, width);
        }
      },
      false
    )
  );
}

function removeNodeHoverFunction(circleClassName, svgState, resetAll) {
  circles = qq(circleClassName);
  circles.forEach((circ, i) =>
    circ.addEventListener(
      "mouseout",
      function(event) {
        var x = event.target.getAttribute("cx");
        var y = event.target.getAttribute("cy");
        var tentativeLine = " ";

        // if (!x || !y) {
        //   return false;
        // }

        if (svgState.drawMode === "move") {
          return false;
        }

        var width = q("#rangeinput").value;
        var svgCommands = svgState.commands.join(" ");

        if (svgCommands.length > 2) {
          updateSVG("#svg-icon path", svgCommands, width);
          updateSVG("#outputSVG path", svgCommands, width);
        }
      },
      false
    )
  );
}
