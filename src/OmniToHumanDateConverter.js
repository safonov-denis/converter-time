import React, { useState } from 'react';
import './Converter.css';


function OmniToHumanDateConverter() {
  const [omniTimestamp, setOmniTimestamp] = useState('');
  const [result, setResult] = useState('');

  const convertToHumanDate = () => {
    if (omniTimestamp === '') {
      setResult('Пожалуйста, введите Omni Timestamp');
      return;
    }

    if (!/^\d+$/.test(omniTimestamp)) {
      setResult('Можно вводить только цифры');
      return;
    }

    const unixTimestamp = parseInt(omniTimestamp) + 1230768000;
    const date = new Date(unixTimestamp * 1000);
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
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year(s) ago`;
    } else if (months > 0) {
      return `${months} month(s) ago`;
    } else if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${seconds} second(s) ago`;
    }
  };

  return (
    <div className="timestamp-widget">
      <h2>Omni Timestamp в Human date</h2>
      <input
        type="text"
        value={omniTimestamp}
        onChange={(e) => setOmniTimestamp(e.target.value)}
      />
      <button onClick={convertToHumanDate}>Конвертировать</button>
      <div>{result}</div>
    </div>
  );
}

export default OmniToHumanDateConverter;