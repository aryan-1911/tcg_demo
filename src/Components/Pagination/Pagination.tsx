import React, { useRef } from 'react';
import { QueryParams } from 'interfaces';

import './pagination.scss';
import { Icon } from '@material-ui/core';
import { Button } from 'Components/common/form';

import ReactPaginate from 'react-paginate';

interface IPaginationProps {
  pageCount: number;
  initialQuery: QueryParams;
  getList: (evQueryParams?: QueryParams | undefined) => void;
}

function Pagination(props: IPaginationProps) {
  const paginateRef = useRef<any>(null);
  const {
    initialQuery: { limit = 5 },
    pageCount = 0,
    getList,
  } = props;

  const selectPage = (selectedItem: { selected: number }) => {
    paginateRef?.current?.setState({ selected: selectedItem.selected });
    getList({ page: selectedItem.selected + 1 });
  };

  if (!pageCount) return null;

  return (
    <div className="pagination">
      <div className="pagination__box">
        <Button
          className="pagination__btn"
          onClick={() => selectPage({ selected: 0 })}
        >
          <Icon className="icon-arrows_left" />
        </Button>
        <ReactPaginate
          ref={paginateRef}
          previousLabel={<Icon className="icon-arr_left" />}
          nextLabel={<Icon className="icon-arr_right" />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={selectPage}
          containerClassName={'pagination__list'}
          activeClassName={'active'}
        />
        <Button
          className="pagination__btn"
          onClick={() => selectPage({ selected: pageCount - 1 })}
        >
          <Icon className="icon-arrows_right" />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
