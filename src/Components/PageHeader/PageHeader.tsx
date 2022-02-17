import { Button } from 'Components/common/form';
import DOMPurify from 'dompurify';
import React, { ReactElement } from 'react';
import { useHistory, useLocation } from 'react-router';
import './page-header.scss';


interface IPageHeader {
  title: string | ReactElement;
  btns?: ReactElement | null;
}

function PageHeader(props: IPageHeader) {
  const { title, btns } = props;
  const {pathname} = useLocation();
  const history = useHistory();
  let isMatchPage = pathname === '/matches';
  const howToPlayBtn = (
    <Button onClick={() => history.push('/howtoplay')} btnType="play">
      How To Play?
    </Button>
  );
  const renderTitle = () => {
    if (typeof title === 'string')
      return (
        <span
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
        ></span>
      );
    return title;
  };
  return (
    <div className="page-header">
      <div className="page-header__title">{renderTitle()}</div>
      {isMatchPage && howToPlayBtn }
      <div className="page-header__btns">{btns}</div>
    </div>
  );
}

export default PageHeader;
