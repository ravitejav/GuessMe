import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { GET_CREATED_ROOM_BY_USER, GET_ELIGIBLE_ROOMS, HTTP_METHODS } from "../Api/ApiConstants";
import { makeRequest } from "../Api/fetchCaller";
import { ELIGIBLE_ROOM } from "../Constants/RoomConstants";
import { GameRoom } from "../propTypes/Models";
import { jwtToken } from "../Recoil";

export const useGameRooms = (initalRoomType: string) => {

    const [roomsList, setRoomsList] = useState([] as Array<GameRoom>);
    const [roomType, setRoomType] = useState(initalRoomType);
    const [token, ] = useRecoilState(jwtToken);
    
    useEffect(() => {
        const fetchResults = async () => {
            const URL  = initalRoomType === ELIGIBLE_ROOM ? GET_ELIGIBLE_ROOMS : GET_CREATED_ROOM_BY_USER;
            const results: any = await makeRequest(URL + '1', HTTP_METHODS.GET, token || '');
            setRoomsList(results);
        }
        fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomType]);


    return [roomsList, setRoomType];
}