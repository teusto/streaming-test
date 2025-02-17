import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { useGSAP } from '@gsap/react';
import gsap, { Power4 } from 'gsap';

const CarouselItem = ({ animateEnter, id, animateExit }) => {
    const onCursorEnter = () => {
        // stop the carousel
        // animate up and large width to show informatio
        animateEnter(id)
        console.log('mouse hovered over carousel item')
    }

    const onCursorExits = () => {
        // revert animation
        // carousel playing again from where it stopped
        animateExit(id)
        console.log('mouse exits carousel item')
    }

    return (
        <div className={styles.CIWrapper} onMouseOver={onCursorEnter} onMouseOut={onCursorExits} />
    )
}

const Carousel = () => {
    const carouselItemRef = useRef<HTMLInputElement>(null);

    const animateCarousel = () => {
        console.log('starting infinite carousel')
        gsap.to(`.${styles.carouselList}`, {x: (carouselItemRef.current?.clientWidth - window.innerWidth) * -1, ease: 'none', repeat: -1, duration: 5})
    }

    const animateEnter = (itemID) => {
        console.log(`${itemID} animation`)
        gsap.to([carouselItemRef.current?.childNodes[itemID]], { y: -100, ease: Power4.easeOut });
    }

    const animateExit = (itemID) => {
        console.log(`${itemID} animation`)
        gsap.to([carouselItemRef.current?.childNodes[itemID]], { y: 0, ease: Power4.easeInOut });
    }

    console.log(carouselItemRef);

    useEffect(animateCarousel, []);

    return (
        <section className={styles.wrapper}>
            {carouselItemRef &&
                <ul className={styles.carouselList} ref={carouselItemRef}>
                    <CarouselItem id={0} animateEnter={animateEnter} animateExit={animateExit} />
                    <CarouselItem id={1} animateEnter={animateEnter} animateExit={animateExit} />
                    <CarouselItem id={2} animateEnter={animateEnter} animateExit={animateExit} />
                    <CarouselItem id={3} animateEnter={animateEnter} animateExit={animateExit} />
                    <CarouselItem id={4} animateEnter={animateEnter} animateExit={animateExit} />
                </ul>
            }
        </section>
    )
}

export default Carousel;