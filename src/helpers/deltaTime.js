const deltaTime = (tempDate, savedTime = 0) => {
  const delta =
    (Date.parse(new Date()) - Date.parse(tempDate)) / 1000 + savedTime;
  // console.log('delta = ', delta)
  return Math.round(delta);
};

export default deltaTime;
