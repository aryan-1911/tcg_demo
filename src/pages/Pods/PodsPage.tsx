import React from 'react';
import { Link } from 'react-router-dom';
function PodsPage() {
  return (
    <div className="comming-soon">
      <div className="wrap">
        <h2>Play 8 player on demand pods for larger prizes.</h2>
        <h1>Coming Soon.</h1>
        <Link to="/" className="btn btn-red btn-hover">
          Back To Home
        </Link>
      </div>
      {/* <Button href="/">Back To Home</Button> */}
    </div>
  );
}

export default PodsPage;
