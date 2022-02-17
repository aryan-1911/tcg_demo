import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <div>Not Found</div>
      <Link to="/">Link to homepage</Link>
    </div>
  );
}

export default NotFoundPage;
