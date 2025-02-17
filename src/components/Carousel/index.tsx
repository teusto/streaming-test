import { useRef } from 'react';
import styles from './style.module.scss';
import { useGSAP } from '@gsap/react';
import gsap, { Power4 } from 'gsap';

const CarouselItem = () => {
    const onCursorEnter = () => {
        // stop the carousel
        // animate up and large width to show information
        console.log('mouse hovered over carousel item')
    }

    const onCursorExits = () => {
        // revert animation
        // carousel playing again from where it stopped
        console.log('mouse exits carousel item')
    }

    return (
        <div className={styles.CIWrapper} onMouseOver={onCursorEnter} onMouseOut={onCursorExits}/>
    )
}

const Carousel = () => {
    const carouselItemRef = useRef<HTMLInputElement>(null);

    useGSAP(() => {
        gsap.to(carouselItemRef.current?.childNodes[0], { y: -100, width: 500, ease: Power4.easeInOut})
    }, {scope: carouselItemRef})

    console.log(carouselItemRef);

    return(
        <section className={styles.wrapper} ref={carouselItemRef}>
            <CarouselItem />
            <CarouselItem />
            <CarouselItem />
            <CarouselItem />
            <CarouselItem />
        </section>
    )
}

export default Carousel;