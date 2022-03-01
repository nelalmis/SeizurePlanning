function doFormatDate(date) {
  if (!date) return date;
  const strDate =
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2);
  return strDate;
}
function doCalculateSeizurePlan(seizurePlan) {}
function minuteToHourAndMinute(minute) {
  let hour = Math.floor(Number(minute) / 60);
  let remainingMinute = Number(minute) % 60;

  return {
    hour: toFixedHour(hour),
    minute: addZeroLeftToNumber(remainingMinute),
  };
}
function dateDiffInMinutes(startDate, endDate){
  if (startDate > endDate) return 0;
  let diffMinutes = (endDate.getTime() - startDate.getTime()) / 1000;
  diffMinutes /= 60;
  return Math.abs(Math.round(diffMinutes));
}
function addZeroLeftToNumber(number) {
    number = Number(number);
  if (number >= 10) {
    number = number.toFixed(2);
  } else {
    number = "0" + Number(number);
  }
  return number;
}
function toFixedHour(hour) {
    hour = Number(hour);
  if (hour >= 10) {
    hour = hour.toFixed(2);
  } else {
    hour =  hour.toFixed(0);
  }
  return hour;
}
export { doFormatDate,minuteToHourAndMinute ,dateDiffInMinutes};
