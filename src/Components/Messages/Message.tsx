import { MessageProp } from "../../propTypes/MessagesProp";
import './Message.css';

export const Message = (messageProps: MessageProp) => {
    return (
        <div className={`messageContianer ${messageProps.message.type.toLowerCase() === 'answer' ? 'answer' : ''}`}>
            <p>{messageProps.message.message}</p>
        </div>
    );
}