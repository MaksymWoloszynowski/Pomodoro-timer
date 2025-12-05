import React from "react";
import Button from "./Button";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const DropdownOptions = ({ task, deleteTask, toggleEdit }) => {
  return (
    <div className="dropdown-container">
      <ul className="dropdown-menu">
        <li onClick={() => toggleEdit(task.id)} className="dropdown-item">
          <FaEdit />
          <p className="dropdown-text">Edit</p>
        </li>
        <li onClick={() => deleteTask(task.id)} className="dropdown-item">
          <FaTrash />
          <p className="dropdown-text">Delete</p>
        </li>
        {/* <li></li> */}
      </ul>
    </div>
  );
};
{
  /* <Button
            onClick={() => startTask(task.id)}
            text={active ? "Active" : "Start"}
          /> */
}

export default DropdownOptions;
