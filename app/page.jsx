'use client'

import Timer from "@/components/Timer";
import TasksPage from "@/components/TasksPage";
import NavBar from "@/components/NavBar";

const HomePage = () => {

  return (
    <div>
      <NavBar />
      <Timer />
      <TasksPage />
    </div>
  );
};

export default HomePage;
