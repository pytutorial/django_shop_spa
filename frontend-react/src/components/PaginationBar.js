import React from 'react';

export default function PaginationBar(props) {
  const total = props.total || 0;
  const pageSize = props.pageSize;
  const numPage = Math.ceil(total / pageSize);
  const page = props.page;
  const setPage = props.setPage;

  if(numPage <= 1) return <></>;

  return (
    <>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href={void(0)}
            onClick={() => setPage(1)}
          >&laquo;</a>
        </li>

        <li className="page-item">
          <a className="page-link" href={void(0)}
            onClick={() => {if(page > 1) setPage(page-1);}}
          >&lsaquo;</a>
        </li>

        <li className="page-item">
          <a className="page-link" href={void(0)}
            onClick={() => {if(page < numPage) setPage(page+1);}}
          >&rsaquo;</a>
        </li>

        <li className="page-item">
          <a className="page-link" href={void(0)}
            onClick={() => setPage(numPage)}
          >&raquo;</a>
        </li>        
      </ul>
      <span className="mr-2">Trang {page}/{numPage}</span>
      <span>Tổng số kết quả: {total} </span>
    </>
  )
}