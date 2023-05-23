const timeSerializer = (currentTimestamp) => {
  const currentDate = new Date(currentTimestamp);
  currentDate.setHours(0, 0, 0, 0);
  // I do not divide by 1000 because blockchain timestamps are in seconds units
  const timestamp = Math.floor(currentDate.getTime() / 1000);

  return timestamp;
};

const getDayTimestamp = () => {
  const currentDate = new Date().getTime();
  const dayTimestamp = timeSerializer(currentDate);
  return dayTimestamp;
};

module.exports = {
  timeSerializer,
  getDayTimestamp,
};
