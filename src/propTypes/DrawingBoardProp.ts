import { Dispatch, SetStateAction } from "react";
import { Client } from "stompjs";

export interface DrawingBoardProp {
  roomId: string;
  currentConnection: Client;
  passDrawingRef: (ref: any) => void;
}

export interface DrawingOptionProps {
  setPenColor: Dispatch<SetStateAction<string>>;
  setPenSize: Dispatch<SetStateAction<number>>;
}

export interface DrawingOptionPropsRef {
  handleImageUpdates: any;
}
