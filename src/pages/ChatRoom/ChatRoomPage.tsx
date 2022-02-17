import React from 'react';
import { Link } from 'react-router-dom';
function ChatRoomPagePage() {
  return (
    <div className="comming-soon height--full">
      <div className="wrap height--full">
        <h2>Chat with hundreds of players on your own tcg chat room.</h2>
        <h1>Coming Soon.</h1>
        <Link to="/" className="btn btn-red btn-hover">
          Back To Home
        </Link>
      </div>
      {/* <Button href="/">Back To Home</Button> */}
    </div>
  );
}

export default ChatRoomPagePage;
