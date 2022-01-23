import Stomp, { Client } from "stompjs";

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
    stomp.subscribe(`/topic/room/${roomId}/imageUpdates`, imageUpdates);
    stomp.subscribe(`/topic/room/${roomId}/messageUpdates`, messageUpdates);
    stomp.subscribe(`/topic/room/${roomId}/scoreUpdates`, scoreUpdates);
    sendStompInstance(stomp);
  });
};
