import React, { useState, useEffect } from 'react';
import './Converter.css';

function HumanDateToOmniConverter() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    setYear(currentDate.getFullYear().toString());
    setMonth((currentDate.getMonth() + 1).toString());
    setDay(currentDate.getDate().toString());
    setHour(currentDate.getHours().toString());
    setMinute(currentDate.getMinutes().toString());
    setSecond(currentDate.getSeconds().toString());
  }, []);

  const convertToOmniTimestamp = () => {
    if (!year || !month || !day || !hour || !minute || !second) {
      setResult('Пожалуйста, заполните все поля');
      return;
    }
    if (!/^\d+$/.test(year) || !/^\d+$/.test(month) || !/^\d+$/.test(day) || !/^\d+$/.test(hour) || !/^\d+$/.test(minute) || !/^\d+$/.test(second)) {
      setResult('Можно вводить только цифры');
      return;
    }
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );

    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const omniTimestamp = (unixTimestamp - 1230768000);
    const gmtDate = new Date((omniTimestamp + 1230768000) * 1000);
    const localDate = new Date((omniTimestamp + 1230768000) * 1000);

    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'GMT',
      hour12: false,
    };

    const gmt = gmtDate.toLocaleString('en-US', options);
    const localOptions = {
        ...options,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      
      const localTimezone = localDate.toLocaleString('en-US', localOptions);

    const relativeTime = calculateRelativeTime(localDate);

    setResult(
      `Omni Timestamp (s): ${omniTimestamp}\nGMT: ${gmt}\nYour Time Zone: ${localTimezone}\nRelative: ${relativeTime}`
    );
  };

  const calculateRelativeTime = (date) => {
    const currentTime = new Date();
    const differenceInSeconds = Math.floor((currentTime - date) / 1000);

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} seconds ago`;
      } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `${minutes} minutes ago`;
      } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `${hours} hours ago`;
      } else {
        const days = Math.floor(differenceInSeconds / 86400);
        return `${days} days ago`;
      }
    };

    return (
        <div className="timestamp-widget">
          <h2>Human date в Omni Timestamp</h2>
          <div className="input-row">
            <label htmlFor="year">Y </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="month">M </label>
            <input
              type="text"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="day">D </label>
            <input
              type="text"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="hour">H </label>
            <input
              type="text"
              id="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="minute">M </label>
            <input
              type="text"
              id="minute"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="second">S </label>
            <input
              type="text"
              id="second"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
            />
    
        </div>
          <button onClick={convertToOmniTimestamp}>Конвертировать</button>
          <div>{result}</div>
        </div>
      );
    }
    
    export default HumanDateToOmniConverter;