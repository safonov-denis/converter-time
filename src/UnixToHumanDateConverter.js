import React, { useState } from 'react';
import './Converter.css';

function UnixToHumanDateConverter() {
  const [unixTimestamp, setUnixTimestamp] = useState('');
  const [result, setResult] = useState('');

  const convertToHumanDate = () => {
    if (unixTimestamp === '') {
      setResult('Пожалуйста, введите Unix Timestamp');
      return;
    }

    if (!/^\d+$/.test(unixTimestamp)) {
      setResult('Можно вводить только цифры');
      return;
    }

    const date = new Date(parseInt(unixTimestamp) * 1000);
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'GMT',
      hour12: false
    };

    const gmt = date.toLocaleString('en-US', options);
    const localTimezone = date.toLocaleString('en-US', {
      ...options,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    const relativeTime = calculateRelativeTime(date);

    setResult(`GMT: ${gmt}\nYour Time Zone: ${localTimezone}\nRelative: ${relativeTime}`);
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
      <h2>Unix Timestamp в Human date</h2>
      <input
        type="text"
        value={unixTimestamp}
        onChange={(e) => setUnixTimestamp(e.target.value)}
      />
      <button onClick={convertToHumanDate}>Конвертировать</button>
      <div>{result}</div>
    </div>
  );
}

export default UnixToHumanDateConverter;