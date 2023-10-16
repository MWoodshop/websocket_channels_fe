import { useEffect, useState } from 'react';
import ActionCable from 'actioncable';
import { useParams } from 'react-router-dom';

function GameRoom() {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [hasNickname, setHasNickname] = useState(false);
  const { gameId } = useParams();

  useEffect(() => {
    // Check if the user has a saved nickname for this game ID
    const savedNickname = localStorage.getItem(`nickname_${gameId}`);
    if (savedNickname) {
      setNickname(savedNickname);
      setHasNickname(true);
    }

    let consumer = ActionCable.createConsumer('wss://escapelink-be-42ffc95e6cf7.herokuapp.com/cable');
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

  function handleNicknameSubmit() {
    // Save the nickname to localStorage
    localStorage.setItem(`nickname_${gameId}`, nickname);
    setHasNickname(true);
  }

  return (
    <div>
      This is the Game Room for game with ID: {gameId}

      {!hasNickname ? (
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={handleNicknameSubmit}>Set Nickname</button>
        </div>
      ) : (
        <div>
          <div>Hello, {nickname}!</div>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}

      <div>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default GameRoom;
