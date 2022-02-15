import Stomp, { Client } from "stompjs";
import { TOPIC_IMAGE_UPDATES, TOPIC_MESSAGE_UPDATES, TOPIC_SCORE_UPDATES } from "./ApiConstants";

export const stompConnection = (
  roomId: any,
  imageUpdates: (msg: any) => void,
  messageUpdates: (msg: any) => void,
  scoreUpdates: (msg: any) => void,
  sendStompInstance: (stomp: any) => void
) => {
  const socket = new WebSocket("ws://localhost:9001/roomUpdates");
  const stomp: Client = Stomp.over(socket);
  stomp.connect({}, (frame) => {
    stomp.subscribe(TOPIC_IMAGE_UPDATES(roomId), imageUpdates);
    stomp.subscribe(TOPIC_MESSAGE_UPDATES(roomId), messageUpdates);
    stomp.subscribe(TOPIC_SCORE_UPDATES(roomId), scoreUpdates);
    sendStompInstance(stomp);
  });
};
