import { Client } from "stompjs";
import { User } from "./Models";

export interface RoomUserProps {
  roomId: string;
  user: User;
  currentConnection: Client;
  getNewUser: any;
  
}
