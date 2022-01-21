import { ELIGIBLE_ROOM } from '../../Constants/RoomConstants';
import { useGameRooms } from '../../CustomHooks/GameListHooks';
import { GameListProps } from '../../propTypes/GameListProps';
import { GameRoom } from '../../propTypes/Models';
import './GameList.css';

export const GameList = (gameListProps: GameListProps) => {

    const [gameRooms, ] = useGameRooms(gameListProps.listType);

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
                            <button>{ELIGIBLE_ROOM === gameListProps.listType ? 'JOIN GAME' : 'START GAME'}</button>
                    </li>
                ))
            )}
            </ul>
        </div>
    )

}