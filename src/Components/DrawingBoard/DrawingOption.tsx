import { PencilColors, PencilSizes } from "../../Constants/DrawingOptionsConstants";
import { getColorCss, getCssForPencil } from "../../helpers/GetCssForDrawingOptions";
import { DrawingOptionProps } from "../../propTypes/DrawingBoardProp";
import "./DrawingOption.css";

export const DrawingOption = (drawingProps: DrawingOptionProps) => {


    const setPenColor = (color: string) => {
        drawingProps.setPenColor(color);
    }

    const setPenSize = (size: number) => {
        drawingProps.setPenSize(size);
    }

    return (
        <div className="drawingOptionContainer">
            <div className="pencils">
                {PencilSizes.map((pencil: {size: number}) => (
                    <div className="singlePencil center" onClick={() => setPenSize(pencil.size)}>
                        <div style={getCssForPencil(pencil.size)}></div>
                    </div>
                ))}
            </div>
            <div className="colors">
                {PencilColors.map((pencilColor: {color: string}) => (
                    <div style={getColorCss(pencilColor.color)} onClick={() => setPenColor(pencilColor.color)}></div>
                ))}
            </div>
        </div>
    );
}