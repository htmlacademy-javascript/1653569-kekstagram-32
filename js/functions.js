const isMeetingFirst = (workDayStart, workDayEnd, meetingStart, meetingDuration) => {
  const convertedToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return +hours * 60 + +minutes;
  };

  const workDayStartMinutes = convertedToMinutes(workDayStart);
  const workDayEndMinutes = convertedToMinutes(workDayEnd);
  const meetingStartMinutes = convertedToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return workDayStartMinutes <= meetingStartMinutes && meetingEndMinutes <= workDayEndMinutes;
};

isMeetingFirst('08:00', '17:30', '14:00', 90); // true
isMeetingFirst('8:0', '10:0', '8:0', 120); // true
isMeetingFirst('08:00', '14:30', '14:00', 90); // false
isMeetingFirst('14:00', '17:30', '08:0', 90); // false
isMeetingFirst('8:00', '17:30', '08:00', 900); // false


const isMeetingSecond = (...args) => {
  const convertedToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return +hours * 60 + +minutes;
  };
  const [workDayStart, workDayEnd, meetingStart, meetingDuration] = args
    .map((el) => typeof el === 'string'
      ? convertedToMinutes(el)
      : el);

  return workDayStart <= meetingStart && meetingStart + meetingDuration <= workDayEnd;
};

isMeetingSecond('08:00', '17:30', '14:00', 90); // true
isMeetingSecond('8:0', '10:0', '8:0', 120); // true
isMeetingSecond('08:00', '14:30', '14:00', 90); // false
isMeetingSecond('14:00', '17:30', '08:0', 90); // false
isMeetingSecond('8:00', '17:30', '08:00', 900); // false
