import { getStaticPageAction } from 'actions';
import { StaticPagesRoute } from 'const';
import { StaticPageTypes } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { TermsAside } from './parts/TermsAside';
import './terms-condition-wrapper.scss';
import { ITermsPage } from './TermsConditionsPage';

interface IProps {
  currPath: string;
  history: RouteComponentProps['history'];
}

export const StaticPagesWrapper = (Router: any) => {
  const Wrapper: React.FC<IProps> = ({ currPath, history }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [content, setContent] = useState<ITermsPage>({
      title: '',
      terms: [],
    });
    const isTermPage = location.pathname === StaticPagesRoute.TERMS;

    const handleSuccess = (data) => {
      setContent(JSON.parse(data));
    };


    let type = StaticPageTypes.PRIVACY;
    const path = location.pathname;

    if (path === StaticPagesRoute.COOKIE_POLICY) {
      type = StaticPageTypes.COOKIE;
    }

    if (path === StaticPagesRoute.TERMS) {
      type = StaticPageTypes.TERMS;
    }
            
    if (path === StaticPagesRoute.PRIVACY_POLICY){
      type = StaticPageTypes.PRIVACY;
    }

    useEffect(() => {
      // if (isTermPage) {

      //   if (path === StaticPagesRoute.COOKIE_POLICY) {
      //     type = StaticPageTypes.COOKIE;
      //   }
        
      //   dispatch(
      //     getStaticPageAction(type, {
      //       redirect: handleSuccess,
      //     }),
      //   );
      // }
        dispatch(
          getStaticPageAction(type, {
            redirect: handleSuccess,
          }),
        );
    }, [dispatch, isTermPage]);

    return (
      <div className="terms_condition-wrapper adaptive-aside-wrapper">
        <div className="terms_condition">
          <TermsAside content={content} />
          <div className="terms_condition-content adaptive-aside-content">
            <Router content={content} />
            {/* <CommingSoonPage></CommingSoonPage> */}
            {/* <RenderPrivacyPolicyContent></RenderPrivacyPolicyContent> */}
          </div>
        </div>
      </div>
    );
  };

  return ({ history, location: { pathname } }: RouteComponentProps) => (
    <Wrapper currPath={pathname} history={history} />
  );
};
