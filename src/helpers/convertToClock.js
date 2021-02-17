const convertToClock = delta => {
  const h = toTwoDigit(Math.floor(delta / 3600));
  const min = toTwoDigit(Math.floor(delta / 60 - h * 60));
  const sec = toTwoDigit(Math.floor(delta % 60));
  const fullTime = `${h} : ${min} : ${sec}`;
  // console.log('fullTime = ', fullTime);
  return fullTime;
};

const toTwoDigit = data => data.toString().padStart(2, '0');

export default convertToClock;
