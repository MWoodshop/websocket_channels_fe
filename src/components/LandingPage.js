import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function LandingPage() {
  const navigate = useNavigate(); // Get the navigate function using the hook

  // This function retrieves the value of a cookie by its name.
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const startGame = () => {
    fetch('https://escapelink-be-42ffc95e6cf7.herokuapp.com/api/v0/games', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCookie("X-CSRF-Token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      navigate(`/game/${data.room_name}`);
    })
    .catch(error => {
      console.error('Error creating channel:', error);
    });
  };

  return (
    <div>
      <h1>Welcome to the Escape Room!</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default LandingPage;
