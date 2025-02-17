import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { useGSAP } from '@gsap/react';
import gsap, { Power4 } from 'gsap';

const CarouselItem = ({ animateEnter, id, animateExit, animateState, animateClick }) => {
    const onCursorEnter = () => {
        // stop the carousel
        animateState('pause')
        // animate up and large width to show informatio
        animateEnter(id)
        console.log('mouse hovered over carousel item')
    }

    const onCursorExits = () => {
        // revert animation
        animateExit(id)
        animateState('resume')
        // carousel playing again from where it stopped
        console.log('mouse exits carousel item')
    }

    const onCursorClick = () => {
        animateClick(id)
        console.log('mouse cliked carousel item')
    }

    return (
        <div className={styles.CIWrapper} onMouseOver={onCursorEnter} onMouseOut={onCursorExits} onClick={onCursorClick}/>
    )
}

const Carousel = () => {
    const [animationState, setAnimationState] = useState('initial');
    const carouselListRef = useRef<HTMLInputElement>(null);

    const animateEnter = (itemID: number) => {
        gsap.to([carouselListRef.current?.childNodes[itemID]], { y: -100, ease: Power4.easeOut, width: 420 });
        gsap.to([carouselListRef.current], { y: -100, ease: Power4.easeOut }).pause();
    }

    const animateExit = (itemID: number) => {
        gsap.to([carouselListRef.current?.childNodes[itemID]], { y: 0, ease: Power4.easeInOut, width: 220 });
    }

    const animateClick = (itemID: number) => {
        setAnimationState('stop');
        //gsap.to(carouselListRef.current, { width: '100%',position: 'fixed', top: 0, height: '60%', duration: 1, delay: 1, ease: Power4.easeIn})
        //gsap.to([carouselListRef.current?.childNodes[itemID]], { width: '100%', duration: 1, delay: 1, ease: Power4.easeIn})

    }

    useGSAP((context) => {
        let tl = gsap.to(carouselListRef.current, { x: (carouselListRef.current?.clientWidth - window.innerWidth) * -1, ease: 'none', repeat: -1, duration: 6 })
        if (animationState === 'pause') {
            tl.pause()
            context.kill()
        }
        if (animationState === 'resume') {
            tl.resume()
        }
        if(animationState === 'stop'){
            tl.kill()
            context.kill()
        }
        console.log({context})
    }, [animationState])

    return (
        <section className={styles.wrapper}>
            {carouselListRef &&
                <ul className={styles.carouselList} ref={carouselListRef}>
                    <CarouselItem id={0} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick}/>
                    <CarouselItem id={1} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick}/>
                    <CarouselItem id={2} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick}/>
                    <CarouselItem id={3} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick}/>
                    <CarouselItem id={4} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick}/>
                    <CarouselItem id={5} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick}/>
                    <CarouselItem id={6} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick}/>
                </ul>
            }
            <div className={styles.shadeBorderSection}/>
        </section>
    )
}

export default Carousel;