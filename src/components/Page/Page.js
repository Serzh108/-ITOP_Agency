import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import deltaTime from '../../helpers/deltaTime';
import convertToClock from '../../helpers/convertToClock';
import styles from './Page.module.css';

export default function Page() {
  const intervalId = useRef();
  const [time, setTime] = useState(new Date());

  const [clock, setClock] = useState(0);
  const [isRun, setIsRun] = useState(false);
  const [fixedClock, setFixedClock] = useState(0);

  useEffect(() => {
    if (isRun) {
      intervalId.current = setInterval(() => setTime(new Date()), 1000);
    }
    return () => () => clearInterval(intervalId.current);
  }, [isRun]);

  const startClock = () => {
    setClock(new Date());
    setIsRun(true);
  };

  const stopClock = () => {
    setIsRun(false);
    clearInterval(intervalId.current);
    setClock(new Date());
  };

  const waitClock = () => {
    setIsRun(false);
    setFixedClock(deltaTime(clock, fixedClock));
    setClock(new Date());
    clearInterval(intervalId.current);
  };

  const resetClock = () => {
    setFixedClock(0);
    setClock(new Date());
  };

  // ===========---=============

  return (
    <>
      <div className={styles.clockBlock}>
        {isRun
          ? convertToClock(deltaTime(clock, fixedClock))
          : convertToClock(fixedClock)}
      </div>
      <div className={styles.buttonBlock}>
        <Button onBtnClick={isRun ? stopClock : startClock}>
          <p>{isRun ? 'Stop' : 'Start'}</p>
        </Button>
        <Button onBtnClick={waitClock}>
          <p>Wait</p>
        </Button>
        <Button onBtnClick={resetClock}>
          <span>Reset</span>
        </Button>
      </div>
    </>
  );
}
