import { Client } from "stompjs";

export interface MessagesProp {
    currentWord: string;
    getSyncMessage: any;
    stompConnection: Client;
    roomId: string;
}

export interface MessageProp {
    message: UserMessage;
}

export interface UserMessage {
    type: string;
    message: string;
}