import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import useTasksDetails from "@/hooks/useTasksDetails";

import { FaDownload } from "react-icons/fa";

const StatsList = ({ stats }) => {
  const { tasksDetails } = useTasksDetails()

  const [itemOffset, setItemOffset] = useState(0);
  const pageSize = 2;

  const endOffset = itemOffset + pageSize;
  const pageCount = Math.ceil(stats.length / pageSize);
  const current = stats.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageSize) % stats.length;
    setItemOffset(newOffset);
  };

  const headers = [
    { label: "Task Name", key: "taskName" },
    { label: "Date", key: "date" },
    { label: "Time Spent", key: "timeSpent" },
  ];

  const csvReport = {
    filename: "tasks.csv",
    headers: headers,
    data: tasksDetails,
  };

  return (
    <div>
      <div className="stats-list-header">
        <p className="stats-format-title">Tasks details</p>
        <CSVLink {...csvReport} className="download-btn">
          <FaDownload />
          Download
        </CSVLink>
      </div>
      <ul className="stats-list-items">
        <li className="stats-list-item">
          <p className="stats-list-task">Task name</p>
          <p className="stats-list-date">Date</p>
          <p className="stats-list-time">Time spent</p>
        </li>
        {current.map((i, index) => (
          <li key={index} className="stats-list-item">
            <p className="stats-list-task">{i.taskName}</p>
            <p className="stats-list-date">{i.date}</p>
            <p className="stats-list-time">{i.timeSpent} min</p>
          </li>
        ))}
      </ul>

      <ReactPaginate
        className="stats-list-paginate"
        breakLabel="..."
        previousLabel={"◀"}
        nextLabel={"▶"}
        pageCount={pageCount}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default StatsList;
