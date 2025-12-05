import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const StatsList = ({ stats }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const pageSize = 2;

  const endOffset = itemOffset + pageSize;

  const pageCount = Math.ceil(stats.length / pageSize);
  const current = stats.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageSize) % stats.length;
    setItemOffset(newOffset);
  };

//   console.log(current)

  return (
    <div>
      <ul>
        {current.map(i => (
          <li>{i.taskName}, {i.date}</li>
        ))}
      </ul>

      <ReactPaginate
        breakLabel="..."
        previousLabel={"◀"}
        nextLabel={"▶"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default StatsList;
