import { useEffect, useState } from 'react';
import ActionCable from 'actioncable';
import { useParams } from 'react-router-dom';

function GameRoom() {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [subscription, setSubscription] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    let consumer = ActionCable.createConsumer('ws://localhost:3000/cable');

    let sub = consumer.subscriptions.create(
      { channel: 'GameChannel', room: gameId },
      {
        received: (data) => {
          setMessages(prevMessages => [...prevMessages, `${data.nickname}: ${data.message}`]);
        }
      }
    );

    setSubscription(sub);

    return () => {
      sub.unsubscribe();
    };
  }, [gameId]);

  function handleSendMessage() {
    if (currentMessage && nickname && subscription) {
      subscription.send({
        message: currentMessage,
        nickname: nickname
      });
      setCurrentMessage("");
    }
  }

  return (
    <div>
      This is the Game Room for game with ID: {gameId}

      <div>
        <label>Nickname:</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div>
        <textarea
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <div>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default GameRoom;
