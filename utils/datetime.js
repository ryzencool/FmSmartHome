function getTimeStamp() {
  let date = new Date();
  return date.getMilliseconds();
}

export { getTimeStamp };
