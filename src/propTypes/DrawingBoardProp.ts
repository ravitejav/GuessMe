import { Dispatch, SetStateAction } from "react";

export interface DrawingBoardProp {
    roomId: string;
}

export interface DrawingOptionProps {
    setPenColor: Dispatch<SetStateAction<string>>;
    setPenSize: Dispatch<SetStateAction<number>>;
}