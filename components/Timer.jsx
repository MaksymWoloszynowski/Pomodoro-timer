"use client";

import { TimerContext } from "@/context/TimerContext";
import Button from "./Button";
import { useContext } from "react";

const Timer = () => {
  const { mode, timeLeft, isActive, playTimer, pauseTimer, resetTimer } = useContext(TimerContext);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return (
    <div>
      <div className="timer-time">
        {minutes}:{formattedSeconds}
      </div>
      <div className="buttons">
        {isActive ? (
          <Button onClick={pauseTimer} text={"pause"} />
        ) : (
          <Button onClick={playTimer} text={"play"} />
        )}
        <Button onClick={resetTimer} text={"reset"} />
      </div>
    </div>
  );
};

export default Timer;
