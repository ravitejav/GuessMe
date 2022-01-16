import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { TOASTER_DEFAULT_VALUE } from "../../Constants/RecoilConstants";
import { toasterDetails } from "../../Recoil";
import "./Toaster.css";

export const Toaster = () => {

    const [toaster, setToasterDetails] = useRecoilState(toasterDetails);
    
    useEffect(() => {
        if(toaster.show) {
            setTimeout(() => setToasterDetails(TOASTER_DEFAULT_VALUE), 1000);
        }
        return () => setToasterDetails(TOASTER_DEFAULT_VALUE);
    }, [setToasterDetails, toaster.show]);

    return toaster.show  ? (
        <div className="toasterContainer">
            <div className="toaster">
                {/* <span></span> */}
                <p>{toaster.message}</p>
            </div>
        </div>
    ): null;
}