import { useSubscription } from '@apollo/client';
import {
  ON_CREATE_EPISODE,
  ON_UPDATE_EPISODE,
  ON_DELETE_EPISODE,
} from '../../utils/graphql/subscriptions';
import { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';

const NotificationsBox = () => {
  const [eventType, setEventType] = useState<'create' | 'update' | 'delete' | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useSubscription(ON_CREATE_EPISODE, {
    onData: () => setEventType('create'),
  });

  useSubscription(ON_UPDATE_EPISODE, {
    onData: () => setEventType('update'),
  });

  useSubscription(ON_DELETE_EPISODE, {
    onData: () => setEventType('delete'),
  });

  useEffect(() => {
    if (eventType && boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [eventType]);

  useEffect(() => {
    if (eventType) {
      const timeout = setTimeout(() => setEventType(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [eventType]);

  return (
    <div
      ref={boxRef}
      className={`${styles.box} ${eventType ? styles[eventType] : ''}`}
    >
      {eventType ? (
        <div>
          <p>New Event:</p>
          <p>{eventType.toUpperCase()}</p>
        </div>
      ) : (
        <p>No recent events</p>
      )}
    </div>
  );
};

export default NotificationsBox;