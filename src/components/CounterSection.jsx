import React, { useEffect, useRef } from 'react';
import styles from './Counter.module.css';

const Counter = ({ icon, end, text }) => {
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0;
            const end = parseInt(entry.target.dataset.end);
            const duration = 1200;
            const stepTime = Math.abs(Math.floor(duration / end));

            const timer = setInterval(() => {
              start += 1;
              entry.target.innerText = start;
              if (start === end) {
                clearInterval(timer);
              }
            }, stepTime);
          }
        });
      },
      { threshold: 1.0 }
    );

    observer.observe(counterRef.current);
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.icon}><i className={`fas fa-${icon}`}></i></div>
      <div className={styles.counter} data-end={end} ref={counterRef}>0</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

const CounterSection = () => {
  return (
    <div className={styles.counterUp}>
      <div className={styles.content}>
        <Counter icon="history" end={90} text="ATS " />
        <Counter icon="gift" end={121} text="Templates" />
        <Counter icon="users" end={36} text="Happy Clients" />
        <Counter icon="award" end={120} text="Awards Received" />
      </div>
    </div>
  );
};

export default CounterSection;
