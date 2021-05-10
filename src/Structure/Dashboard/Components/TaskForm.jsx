import React, { useState } from "react";
import { Cancel, Save, CoverOver } from "../Styles/AddEditForm";
import { taskActions } from "../State/action";
import { useDispatch, useSelector } from "react-redux";

const AddUpdateForm = ({ setOper }) => {
  const dispatch = useDispatch();
  const isAddingTask = useSelector((state) => state.task.isAddingTask);
  const isUpdatingTask = useSelector((state) => state.task.isUpdatingTask);
  const isDeletingTask = useSelector((state) => state.task.isDeletingTask);
  // const allTask = useSelector((state) => state.task.allTasks);
  const taskObj = {
    assigned_user: localStorage.getItem("userId"),
    task_date: "",
    task_time: "",
    is_completed: 0,
    time_zone: 1520352472,
    task_msg: "",
  };
  let time = "";
  const [taskData, setTaskData] = useState(taskObj);
  const [selTime, setTime] = useState(time);
  const handleInput = (e) => {
    if (e.target.name === "task_time") {
      let [hours, mins] = e.target.value.split(":").map(Number);
      hours = hours * 60 * 60;
      mins = mins * 60;
      setTime(hours + mins);
      setTaskData({ ...taskData, task_time: e.target.value });
    } else {
      setTaskData({ ...taskData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...taskData, task_time: Number(selTime) };
    dispatch(taskActions.addNewTaskProcess(data)).then((res) => {
      if (res.output) {
        setOper("tasks");
      }
    });
  };
  const userName = JSON.parse(localStorage.getItem("userName"));
  return (
    <>
      {(isAddingTask || isUpdatingTask || isDeletingTask) && <CoverOver />}
      <form onSubmit={handleSubmit}>
        <div className="form-group ml-3 mr-4">
          <label htmlFor="formGroupExampleInput">Task Description</label>
          <input
            type="text"
            className="form-control ml-1"
            id="formGroupExampleInput"
            placeholder="Task"
            name="task_msg"
            onChange={handleInput}
            value={taskData.task_msg}
          />
        </div>
        <div className="row ml-1 mr-1">
          <div className="col-6">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              name="task_date"
              onChange={handleInput}
              value={taskData.task_date}
            />
          </div>
          <div className="col-6">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              className="form-control"
              name="task_time"
              onChange={handleInput}
              value={taskData.task_time}
            />
          </div>
        </div>
        <div className="form-group ml-3 mr-4 mt-3">
          <label htmlFor="selectName">Assign User</label>
          <select className="custom-select" id="selectName">
            <option value={userName} defaultValue>
              {userName}
            </option>
          </select>
        </div>
        <div>
          <div className="float-right m-4">
            <Cancel onClick={() => setOper("tasks")}>Cancel</Cancel>
            <Save className="bg-success" type="submit">
              Save
            </Save>
          </div>
        </div>
      </form>
    </>
  );
};

export { AddUpdateForm };
