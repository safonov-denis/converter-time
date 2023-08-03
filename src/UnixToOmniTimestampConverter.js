import React, { useState } from 'react';
import './Converter.css';

function UnixToOmniTimestampConverter() {
  const [unixTimestamp, setUnixTimestamp] = useState('');
  const [result, setResult] = useState('');

  const convertToOmniTimestamp = () => {
    if (unixTimestamp === '') {
      setResult('Пожалуйста, введите Unix Timestamp');
      return;
    }

    if (!/^\d+$/.test(unixTimestamp)) {
      setResult('Можно вводить только цифры');
      return;
    }

    const omniTimestamp = parseInt(unixTimestamp - 1230768000);
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

    setResult(`Omni Timestamp (s): ${omniTimestamp}\nGMT: ${gmt}\nYour Time Zone: ${localTimezone}\nRelative: ${relativeTime}`);
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
      <h2>Unix Timestamp в Omni Timestamp</h2>
      <input
        type="text"
        value={unixTimestamp}
        onChange={(e) => setUnixTimestamp(e.target.value)}
      />
      <button onClick={convertToOmniTimestamp}>Конвертировать</button>
      <div>{result}</div>
    </div>
  );
}

export default UnixToOmniTimestampConverter;