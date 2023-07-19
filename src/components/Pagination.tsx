import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number
  totalElements: number
  size: number
  onPreviusPage: (page: number) => void;
  onNextPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ size, totalElements, totalPages, onNextPage, onPreviusPage }) => {
  
  const [currentPage, setCurrentPage] = useState(0);
  const listPages = Array.apply(null, Array(totalPages)).map((_, index) => index + 1);
  function handleNextPage() {
    if (currentPage >= 0 && currentPage < totalPages-1) {
      setCurrentPage(currentPage + 1);
      onNextPage(currentPage + 1)
    }

  }
  
  function handlePreviusPage() { 
    if( currentPage <= totalPages && currentPage > 0){
      setCurrentPage(currentPage - 1);
      onNextPage(currentPage - 1)
    }

  }


  return (
    <div className="table-pagination-panel">
      <button onClick={handlePreviusPage}>{"<"}</button>
      {listPages.map(item => <button key={item} disabled>{ item}</button>)}
      <button onClick={handleNextPage}>{">"}</button>
    </div>
  );
}

export default Pagination;