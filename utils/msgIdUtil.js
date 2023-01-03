function getMsgId(msgIdArr, setMsgIdArr) {
  if (msgIdArr.length == 5) {
    let lastId = msgIdArr[msgIdArr.length - 1];
    for (let i = 0; i < 100; i++) {
      lastId++;
      msgIdArr.push(lastId);
    }
    const result = msgIdArr.shift();
    setMsgIdArr(msgIdArr);
    return result;
  } else {
    const result = msgIdArr.shift();
    setMsgIdArr(msgIdArr);
    return result;
  }
}

export default getMsgId;
