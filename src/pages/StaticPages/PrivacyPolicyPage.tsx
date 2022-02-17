import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import DOMPurify from 'dompurify';
import { makeSelector } from 'helpers';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import './terms-condition-wrapper.scss';

export interface ITermsPage {
title: string;
terms: {
    title: string;
    html: string;
  }[];
}

interface IProps {
  content: ITermsPage;
}

const PrivacyPolicyPagePage = (props: any) => {
  const { content } = props;

  const privacyPolicyDataData = useSelector<any, any>(
    makeSelector(['staticPagesReducer', 'privacyPolicyData']),
  );

  const isLoading = useSelector<any, boolean>(
    makeSelector(['staticPagesReducer', 'isLoading']),
  );

  return (
    <>
  {isLoading?<LoadingButton></LoadingButton>:(
    <div className="terms-of-service-wrapper static-page ql-editor">
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(privacyPolicyDataData) }}
      />
      {/* {content.terms.map((term, index) => {
        return (
          <div
            key={`${term.title}-${index}`}
            className="content-item"
            id={`terms-anchor-${index}`}
          >
            <h2>
              {index + 1}. {term.title}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(term.html),
              }}
            ></div>
          </div>
        );
      })} */}
    </div>)
    }
    </>
  );
};

export default PrivacyPolicyPagePage;
