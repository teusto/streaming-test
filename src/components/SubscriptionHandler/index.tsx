import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './style.module.scss';
import NotificationsBox from '../Notifications';

const SubscriptionHandler = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = () => {
    gsap.to(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        setIsSubscribed(true);
      }
    });
  };

  useEffect(() => {
    if (isSubscribed && boxRef.current) {
      gsap.fromTo(boxRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3 }
      );
    }
  }, [isSubscribed]);

  return (
    <div className={styles.container}>
      {!isSubscribed ? (
        <button
          ref={buttonRef}
          onClick={handleSubscribe}
          className={styles.subscribeButton}
        >
          Subscribe to Updates
        </button>
      ) : (
        <NotificationsBox ref={boxRef} />
      )}
    </div>
  );
};

export default SubscriptionHandler;