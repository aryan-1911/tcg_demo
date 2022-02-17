import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOMPurify from 'dompurify';
import { getStaticPageAction } from 'actions';
import { StaticPageTypes } from 'interfaces';
import { useLocation } from 'react-router';
import { StaticPagesRoute } from 'const';

function DefaultStaticPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSuccess = (data) => {
    setContent(DOMPurify.sanitize(data));
  };

  useEffect(() => {
    const path = location.pathname;
    let type = StaticPageTypes.PRIVACY;

    if (path === StaticPagesRoute.COOKIE_POLICY) {
      type = StaticPageTypes.COOKIE;
    }

    dispatch(getStaticPageAction(type, { redirect: handleSuccess }));
  }, [dispatch]);

  return (
    <div
      className="static-page"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}

export default DefaultStaticPage;
