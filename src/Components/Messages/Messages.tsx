import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  SUBMIT_MESSAGE_UPDATES,
  SUBMIT_USER_UPDATES,
} from "../../Api/ApiConstants";
import { MessagesProp, UserMessage } from "../../propTypes/MessagesProp";
import { loggedInUserState } from "../../Recoil";
import { Message } from "./Message";

import "./Messages.css";

export const Messages = (messagesProps: MessagesProp) => {
  const [messages, setMessages] = useState([] as Array<UserMessage>);
  const [user] = useRecoilState(loggedInUserState);

  const updateMessage = (message: string) => {
    setMessages((olderMessage: any) =>
      [...olderMessage, JSON.parse(message)].slice(-40)
    );
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const message = form.get("message") as string;
    if (message.length === 0) return;
    const userMsg = `${user.name} : ${message}`;
    const request = { type: "MESSAGE", message: userMsg };
    e.target.reset();
    if (message.toLowerCase() === messagesProps.currentWord.toLowerCase()) {
      request.type = "ANSWER";
      request.message = `${user.name} has guess the word correctly!!!`;
      messagesProps.stompConnection &&
        messagesProps.stompConnection.send(
          SUBMIT_USER_UPDATES(messagesProps.roomId),
          {},
          JSON.stringify({
            type: "SCORE_UPDATE",
            user: {
              userId: user.userId,
              score: 90,
            },
          })
        );
    }
    messagesProps.stompConnection.send(
      SUBMIT_MESSAGE_UPDATES(messagesProps.roomId),
      {},
      JSON.stringify(request)
    );
  };

  useEffect(() => {
    const messageElements = document.getElementsByClassName("messageContianer");
    if (messageElements.length === 0) return;
    setTimeout(
      () => messageElements[messageElements.length - 1].scrollIntoView(),
      500
    );
  }, [messages]);

  messagesProps.getSyncMessage(updateMessage);

  return (
    <div className="messagesContainer">
      <div className="WordContainer center">
        {messagesProps.currentWord} _ _ _ _
      </div>
      <div className="messages">
        {messages.map((message, i) => (
          <Message key={i} message={message} />
        ))}
      </div>
      <form className="word" onSubmit={sendMessage}>
        <input type="text" placeholder="Your message or word" name="message" />
        <button>Send</button>
      </form>
    </div>
  );
};
