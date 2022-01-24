import React, { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { DrawingBoardProp } from "../../propTypes/DrawingBoardProp";
import { DrawingOption } from "./DrawingOption";

import "./DrawingBoard.css";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../Recoil";

export const DrawingBoard = (drawingBoardProps: DrawingBoardProp) => {
  const [color, setColor] = useState("#000000");
  const [penSize, setPenSize] = useState(4);
  // const [drawingMode, setDrawingMode] = useState(true);
  const [user] = useRecoilState(loggedInUserState);



  const handleOnDraw = (updatedPaths: Array<any>) => {
    if (user.userId !== 1) return;
    drawingBoardProps.currentConnection &&
      drawingBoardProps.currentConnection.send(
        `/app/room/${drawingBoardProps.roomId}/imageUpdates`,
        {},
        JSON.stringify({ updatedPaths: updatedPaths[updatedPaths.length - 1] })
      );
  };

  
  return (
    <div className="drawingBoardHolder">
      <div className="canvasHolder">
        <ReactSketchCanvas
          ref={(refer) => {
            if (refer) {
              drawingBoardProps.passDrawingRef(refer);
            }
          }}
          width="100%"
          height="100%"
          strokeWidth={penSize}
          strokeColor={color}
          onChange={handleOnDraw}
          eraserWidth={penSize}
        />
      </div>
      <div className="drawingOptions">
        <DrawingOption setPenColor={setColor} setPenSize={setPenSize} />
      </div>
    </div>
  );
};

