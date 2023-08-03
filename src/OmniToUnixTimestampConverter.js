import React, { useState } from 'react';
import './Converter.css';

function OmniToUnixTimestampConverter() {
  const [omniTimestamp, setOmniTimestamp] = useState('');
  const [result, setResult] = useState('');

  const convertToUnixTimestamp = () => {
    if (omniTimestamp === '') {
      setResult('Пожалуйста, введите Omni Timestamp');
      return;
    }

    if (!/^\d+$/.test(omniTimestamp)) {
      setResult('Пожалуйста, введите только цифры');
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

    setResult(`Unix Timestamp (s): ${unixTimestamp}\nGMT: ${gmt}\nYour Time Zone: ${localTimezone}\nRelative: ${relativeTime}`);
  };

  const calculateRelativeTime = (date) => {
    const now = new Date();
    const differenceInSeconds = Math.floor((now - date) / 1000);

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
      <h2>Omni Timestamp в Unix Timestamp</h2>
      <input
        type="text"
        value={omniTimestamp}
        onChange={(e) => setOmniTimestamp(e.target.value)}
      />
      <button onClick={convertToUnixTimestamp}>Конвертировать</button>
      <div>{result}</div>
    </div>
  );
}

export default OmniToUnixTimestampConverter;