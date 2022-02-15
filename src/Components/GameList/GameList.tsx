import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ELIGIBLE_ROOM } from '../../Constants/RoomConstants';
import { useGameRooms } from '../../CustomHooks/GameListHooks';
import { GameListProps } from '../../propTypes/GameListProps';
import { GameRoom } from '../../propTypes/Models';
import { demo } from '../../Recoil';
import './GameList.css';

export const GameList = (gameListProps: GameListProps) => {

    const [gameRooms, ] = useGameRooms(gameListProps.listType);

    const [, setDemo] = useRecoilState(demo);

    const navigate = useNavigate();

    return (
        <div className="gameListContainers">
            <ul>
            {gameRooms.length > 0 && (
                (gameRooms as Array<GameRoom>).map((room: GameRoom) => (
                    <li className='center' key={room.roomId}>
                            <p>
                                {room.roomname}
                                <span>{room.users.length} users</span>
                            </p>
                            <button onClick={() => {
                                    setDemo(ELIGIBLE_ROOM === gameListProps.listType ? true : false);
                                    navigate(`/GuessMe/game/${room.roomId}`)
                                }}>{ELIGIBLE_ROOM === gameListProps.listType ? 'JOIN GAME' : 'START GAME'}</button>
                    </li>
                ))
            )}
            </ul>
        </div>
    )

}