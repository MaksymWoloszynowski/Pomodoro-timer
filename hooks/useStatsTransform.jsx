export const groupByDay = (stats, currentWeekStart) => {
  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + i);

    const dateStr = date.toLocaleDateString('en-CA'); 

    const dayMinutes = stats
      .filter(item => item.date === dateStr)
      .reduce((acc, curr) => acc + curr.timeSpent, 0);

    result.push({
      label: date.toLocaleDateString("en-CA"),
      minutes: dayMinutes,
      date: dateStr
    });
  }

  return result;
};


export const groupByMonth = (stats, year) => {
  const result = [];

  for (let month = 0; month < 12; month++) {
    const monthMinutes = stats
      .filter(item => {
        const d = new Date(item.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((acc, curr) => acc + curr.timeSpent, 0);

    const formatMonth = month+1 < 10 ? `0${month+1}` : month+1

    result.push({
      label: `${formatMonth}-${String(year).substr(2)}`,
      minutes: monthMinutes,
    });
  }

  return result;
};