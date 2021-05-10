import React, { useEffect, useState } from "react";
import { authActions } from "../authentication";
import { useDispatch, useSelector } from "react-redux";
import { AddUpdateForm } from "./Components/TaskForm";
import { taskActions } from "./State/action";
import { TaskCard } from "./Components/TaskCard";
import {
  Card,
  Title,
  TopBlock,
  AddIcon,
  BottomBlock,
} from "./Styles/AddEditForm";

const Dashboard = () => {
  const [currentOper, setOper] = useState("tasks");
  const allTask = useSelector((state) => state.task.allTasks);
  const isGettingAllTask = useSelector((state) => state.task.isGettingAllTask);
  // console.log(allTask);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.getUserInfoProcess());
  }, [dispatch]);
  useEffect(() => {
    if (currentOper === "tasks") {
      dispatch(taskActions.getAllTaskProcess());
    }
  }, [currentOper, dispatch]);
  return (
    <div className="container-fluid">
      <Card className="m-5">
        <TopBlock>
          <Title>
            Tasks{" "}
            <p
              className="text-secondary ml-2"
              onClick={() => {
                setOper("tasks");
              }}
            >
              {allTask.length}
            </p>
          </Title>
          <AddIcon
            onClick={() => {
              setOper("add");
            }}
          >
            +
          </AddIcon>
        </TopBlock>
        <BottomBlock>
          {isGettingAllTask ? (
            <div>...isLoading</div>
          ) : currentOper === "tasks" ?  (
            <TaskCard
              allTask={allTask}
            />
          ) : (
            <AddUpdateForm
              setOper={setOper}
              currentOper={currentOper}
            />
          )}
        </BottomBlock>
      </Card>
    </div>
  );
};

export { Dashboard };
