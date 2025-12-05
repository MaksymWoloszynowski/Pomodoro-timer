"use client";

import { TimerContext } from "@/context/TimerContext";
import Button from "@/components/Button";
import { useContext } from "react";

const Timer = () => {
  const { mode, timeLeft, isActive, changeMode, playTimer, pauseTimer, resetTimer } = useContext(TimerContext);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  console.log(mode)

  return (
    <div className={'timer-container'}>
      <div className="mode-buttons">
        <Button className={mode === 'work' ? 'active' : ''} onClick={() => changeMode("work")} text={"Pomodoro"} />
        <Button className={mode === 'break' ? 'active' : ''} onClick={() => changeMode("break")} text={"Break"} />
      </div>
      <div className="timer-time">
        {minutes}:{formattedSeconds}
      </div>
      <div className="action-buttons">
        {isActive ? (
          <Button className={mode === 'work' ? 'active' : ''} onClick={pauseTimer} text={"PAUSE"} />
        ) : (
          <Button className={mode === 'work' ? 'active' : ''} onClick={playTimer} text={"PLAY"} />
        )}
        <Button className={mode === 'work' ? 'active' : ''} onClick={resetTimer} text={"RESET"} />
      </div>
    </div>
  );
};

export default Timer;
