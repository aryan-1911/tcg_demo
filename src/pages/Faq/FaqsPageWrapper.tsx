import { getStaticPageAction } from 'actions';
import { StaticPageTypes } from 'interfaces';
import { faqsContentData } from 'pages/StaticPages/defaultContent';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './faq-styles.scss';
import { FaqPage } from './FaqPage';
import FaqAside from './parts/FaqAside';

export interface IFAQPage {
  title: string;
  faq: {
    title: string;
    nestedArray: {
      question: string;
      answer: string;
    }[];
  }[];
}

export const FaqsPageWrapper = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState<IFAQPage>(faqsContentData);

  const handleSuccess = (data) => {
    setContent(JSON.parse(data));
  };

  useEffect(() => {
    dispatch(
      getStaticPageAction(StaticPageTypes.FAQ, {
        redirect: handleSuccess,
      }),
    );
  }, [dispatch]);

  return (
    <div className="faq-page-block adaptive-aside-wrapper">
      <FaqAside content={content} />
      <div className="inner-padding adaptive-aside-content">
        <FaqPage content={content} />
        {/* <CommingSoonPage></CommingSoonPage> */}
      </div>
    </div>
  );
};
