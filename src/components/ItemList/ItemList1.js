import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeIsRun, removeItem } from '../../redux/trackerOperations';
// import moment from 'moment';
import Button from '../Button/Button';
import deltaTime from '../../helpers/deltaTime';
import convertToClock from '../../helpers/convertToClock';
// import { ReactComponent as PauseIcon } from '../../icons/pause_circle_outline-24px.svg';
// import { ReactComponent as RemoveIcon } from '../../icons/remove_circle_outline-24px.svg';
// import { ReactComponent as PlayIcon } from '../../icons/play_circle_outline-24px.svg';
import styles from './ItemList.module.css';

export default function ItemList() {
  const [clock, setClock] = useState(0);
  const [isRun, setIsRun] = useState(false);
  const [isWaitClock, setIsWaitClock] = useState(false);
  const [fixedClock, setFixedClock] = useState(0);

  // const clockId = useRef();
  const startClock = () => {
    console.log('Start');
    setIsWaitClock(false);
    // !isWaitClock && setClock(new Date());
    setClock(new Date());
    setIsRun(true);
    // setFixedClock(0);
  };

  const stopClock = () => {
    console.log('Stop');
    setIsRun(false);
    clearInterval(intervalId.current);
    setClock(new Date());
    // setClock(0);
  };

  const waitClock = () => {
    console.log('wait');
    setIsWaitClock(true);
    setIsRun(false);
    setFixedClock(deltaTime(clock, fixedClock));
    setClock(new Date());
    clearInterval(intervalId.current);
  };

  const resetClock = () => {
    console.log('resetv');
    setFixedClock(0);
    setClock(new Date());
  };

  // ===========---=============

  // const dispatch = useDispatch();
  // const items = useSelector(state => state.tracker.items);

  const intervalId = useRef();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (isRun) {
      intervalId.current = setInterval(() => setTime(new Date()), 1000);
    }
    return () => () => clearInterval(intervalId.current);
  }, [isRun]);

  // const clickPauseHandler = e => {
  //   const li = e.target.closest('LI');
  //   dispatch(changeIsRun(li.id));
  // };

  // const clickRemoveHandler = e => {
  //   const li = e.target.closest('LI');
  //   dispatch(removeItem(li.id));
  // };

  return (
    <>
      {/* <h2>Текущее время: {time && time.toLocaleTimeString()}</h2> */}
      {/* <ul className={styles.list}>
        {items.map(item => (
          <li
            key={item.name}
            id={item.id}
            className={item.isRun ? styles.listItemActive : styles.listItem}
          > */}
      {/* <span className={styles.ItemPart}>{item.name}</span> */}
      {/* <div className={styles.ItemPart1}>
              <span>
                {item.isRun
                  ? convertToClock(deltaTime(item.time, item.fixedTime))
                  : convertToClock(item.fixedTime)}
              </span>
              {item.isRun ? (
                <Button onBtnClick={clickPauseHandler}>
                  <PauseIcon width="24" height="24" fill="#000" />
                </Button>
              ) : (
                <Button onBtnClick={clickPauseHandler}>
                  <PlayIcon width="24" height="24" fill="#000" />
                </Button>
              )}
              <Button onBtnClick={clickRemoveHandler}>
                <RemoveIcon width="24" height="24" fill="#f00" />
              </Button>
            </div> */}
      {/* </li>
        ))}
      </ul> */}

      <div>
        {
          isRun
            ? convertToClock(deltaTime(clock, fixedClock))
            : convertToClock(fixedClock)

          // clock && convertToClock(deltaTime(clock))
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <div>{clock && convertToClock(clock)}</div> */}
        <Button onBtnClick={startClock}>
          <p>Start/Stop</p>
        </Button>
        <Button onBtnClick={stopClock}>Start/Stop</Button>
        <Button onBtnClick={waitClock}>Wait</Button>
        <Button onBtnClick={resetClock}>Reset</Button>
      </div>
    </>
  );
}
