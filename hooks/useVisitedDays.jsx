import { useEffect, useState } from "react";

const useVisitedDays = () => {
  const [visitedDays, setVisitedDays] = useState([]);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA'); 
    const savedVisitedDays = JSON.parse(localStorage.getItem("visitedDays")) || []

    if (savedVisitedDays) {
        const updated = savedVisitedDays.includes(today) ? savedVisitedDays : [...savedVisitedDays, today]
        setVisitedDays(updated)
        localStorage.setItem("visitedDays", JSON.stringify(updated))
    }
  },[])

  return {
    daysCount: visitedDays.length
  };
};
export default useVisitedDays;
