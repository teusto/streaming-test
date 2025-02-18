import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { useGSAP } from '@gsap/react';
import gsap, { Power4 } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useNavigate, useViewTransitionState } from 'react-router';

gsap.registerPlugin(Flip);

const CarouselItem = forwardRef(({ animateEnter, id, animateExit, animateState, animateClick }, ref) => {
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
        <div className={styles.CIWrapper} onMouseOver={onCursorEnter} onMouseOut={onCursorExits} onClick={onCursorClick} ref={ref} />
    )
})

const Carousel = () => {
    const [animationState, setAnimationState] = useState('initial');
    const carouselListRef = useRef<HTMLInputElement>(null);
    const listItemsRef = useRef([]);
    const [flipState, setFlipState] = useState();
    let navigate = useNavigate();

    const animateEnter = (itemID: number) => {
        gsap.to(listItemsRef.current[itemID], { yPercent: -20, ease: Power4.easeOut, width: 420, onComplete: () => console.log('animateEnter onComplete')});
    }

    const animateExit = (itemID: number) => {
        gsap.to(listItemsRef.current[itemID], { yPercent: 0, ease: 'back.in', width: 220 });
    }

    const animateClick = (itemID: number) => {
        setAnimationState('stop');
        let state = Flip.getState(carouselListRef.current?.childNodes, { props: 'backgroundColor, borderRadius, opacity, transform' })
        setFlipState(state)
        carouselListRef.current?.childNodes.forEach((element, index) => {
            if (index === itemID) {
                let searchBox = document.getElementById("SEARCH")
                let whereToPut = document.getElementById("APP")
                whereToPut.append(listItemsRef.current[itemID]);
                //parent.append(listItemsRef.current[itemID])
                console.log({ whereToPut, searchBox })
                searchBox?.remove();
                listItemsRef.current[itemID].style.opacity = 1;
                listItemsRef.current[itemID].style.borderRadius = 0;
                listItemsRef.current[itemID].style.transform = 'translate(0%,0%)';
                listItemsRef.current[itemID].style.position = 'absolute';
                listItemsRef.current[itemID].style.left = '0px';   
                listItemsRef.current[itemID].style.top = '0px';
                listItemsRef.current[itemID].style.height = '299.9px';

                carouselListRef.current?.remove()
                return;
            };
            console.log({ element })
            listItemsRef.current[index].style.opacity = 0;
        })
        Flip.from(state, {
            duration: 2,
            ease: 'expo.out',
            absolute: true,
            prune: true,
            onEnter: (element) => {
                console.log('on enterer flip', element)
            },
            onStart: () => console.log('Started Flip'),
            onLeave: (element) => console.log('on leave', element),
            onComplete: () => {
                navigate("/Series")
            }
        })
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
        if (animationState === 'stop') {
            tl.kill()
            context.kill()
        }
        //console.log({ context })
    }, [animationState])

    //console.log({ listItemsRef, flipState, carouselListRef })

    return (
        <section className={styles.wrapper}>
            {carouselListRef &&
                <ul className={styles.carouselList} ref={carouselListRef}>
                    {[1, 2, 3, 4, 5, 6, 7].map((data, index) => {
                        return (
                            <CarouselItem ref={r => listItemsRef.current[index] = r} key={index} id={index} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick} />
                        )
                    })}
                </ul>
            }
            <div className={styles.shadeBorderSection} />
        </section>
    )
}

export default Carousel;