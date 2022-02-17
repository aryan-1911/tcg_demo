import React from 'react';
import { Link } from 'react-router-dom';
function CommingSoonPage() {
  return (
    <div className="comming-soon">
      <div className="wrap">
        <h1>This page is under construction.</h1>
        <Link to="/" className="btn btn-red btn-hover">
          Back To Home
        </Link>
      </div>
      {/* <Button href="/">Back To Home</Button> */}
    </div>
  );
}

export default CommingSoonPage;
