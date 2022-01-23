import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { DrawingBoardProp } from "../../propTypes/DrawingBoardProp";
import { DrawingOption } from "./DrawingOption";

import { stompConnection } from "../../Api/WebSocketConnection";
import { Client, Message } from "stompjs";

import "./DrawingBoard.css";
import { useRecoilState } from "recoil";
import { demo } from "../../Recoil";

export const DrawingBoard = (drawingBoardProps: DrawingBoardProp) => {
  const [color, setColor] = useState("#000000");
  const [penSize, setPenSize] = useState(4);
  const [drawingMode, setDrawingMode] = useState(true);
  const [demoVal, setDemoVal] = useRecoilState(demo);


  let canvasRef = useRef();

  const setRef = (ref: any) => {
    canvasRef = ref;
  }
  const [currentConnection, setConnection] = useState(null as unknown as Client);

  const handleOnDraw = (updatedPaths: Array<any>) => {
    if(!demoVal) return;
    currentConnection && currentConnection.send(`/app/room/${drawingBoardProps.roomId}/imageUpdates`, {}, JSON.stringify({updatedPaths}));
  }

  const handleImageUpdates = (updates: Message) => {
    if(demoVal) return;
    setDemoVal(true);
    const paths = JSON.parse(updates.body).updatedPaths;
    (canvasRef as any).loadPaths(paths);
    
  }

  useEffect(() => {
    const logger = (msg: string) => console.log(msg);
    stompConnection(drawingBoardProps.roomId, handleImageUpdates, logger, logger, (val) => setConnection(val));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawingBoardProps.roomId]);

  return (
    <div className="drawingBoardHolder">
      <div className="canvasHolder">
        <ReactSketchCanvas
          ref={refer =>  {
            if(refer) {
              setRef(refer);
            }
          }}
          width="100%"
          height="100%"
          strokeWidth={penSize}
          strokeColor={color}
          onChange={handleOnDraw}
        />
      </div>
      <div className="drawingOptions">
        <DrawingOption setPenColor={setColor} setPenSize={setPenSize} />
      </div>
    </div>
  );
};
