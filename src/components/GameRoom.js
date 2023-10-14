import { useEffect, useState } from 'react';
import ActionCable from 'actioncable';  // <- Update this import
import { useParams } from 'react-router-dom';

function GameRoom() {
  const [messages, setMessages] = useState([]);
  const { gameId } = useParams();

  useEffect(() => {
    let consumer = ActionCable.createConsumer('ws://localhost:3000/cable');

    let subscription = consumer.subscriptions.create(
      { channel: 'GameChannel', room: gameId },
      {
        received: (data) => {
          setMessages(prevMessages => [...prevMessages, data]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [gameId]);

  return (
    <div>
      This is the Game Room for game with ID: {gameId}
      <div>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default GameRoom;
