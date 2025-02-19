import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { useGSAP } from '@gsap/react';
import gsap, { Power4 } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useNavigate, useViewTransitionState } from 'react-router';
import { useOMDbPosters } from '../../hooks/useOMDb';

gsap.registerPlugin(Flip);

const CarouselItem = forwardRef(({ animateEnter, id, animateExit, animateState, animateClick, poster, apiID }, ref) => {
    const onCursorEnter = () => {
        // stop the carousel
        animateState('pause')
        // animate up and large width to show informatio
        animateEnter(id)
    }

    const onCursorExits = () => {
        // revert animation
        animateExit(id)
        animateState('resume')
        // carousel playing again from where it stopped
        
    }

    const onCursorClick = () => {
        animateClick(id, apiID, poster)
        
    }

    return (
        <div style={{backgroundImage: `url(${poster})`}} className={styles.CIWrapper} onMouseOver={onCursorEnter} onMouseOut={onCursorExits} onClick={onCursorClick} ref={ref} />
    )
})

const Carousel = ({data}) => {
    const [animationState, setAnimationState] = useState('initial');
    const carouselListRef = useRef<HTMLInputElement>(null);
    const listItemsRef = useRef([]);
    const [flipState, setFlipState] = useState();
    let navigate = useNavigate();

    const imdbIds = data?.map((episode: any) => episode.imdbId) || [];
    // Fetch posters for all episodes
    const { posters, loading: postersLoading, error: postersError } = useOMDbPosters(imdbIds);

    const animateEnter = (itemID: number) => {
        gsap.to(listItemsRef.current[itemID], { yPercent: -20, ease: Power4.easeOut, width: 420});
    }

    const animateExit = (itemID: number) => {
        gsap.to(listItemsRef.current[itemID], { yPercent: 0, ease: 'back.in', width: 220 });
    }

    const animateClick = (itemID: number, id: string, poster: string) => {
        setAnimationState('stop');
        let state = Flip.getState(carouselListRef.current?.childNodes, { props: 'backgroundColor, borderRadius, opacity, transform' })
        setFlipState(state)
        carouselListRef.current?.childNodes.forEach((element, index) => {
            if (index === itemID) {
                let searchBox = document.getElementById("SEARCH")
                let whereToPut = document.getElementById("APP")
                whereToPut.append(listItemsRef.current[itemID]);
                //parent.append(listItemsRef.current[itemID])
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
            listItemsRef.current[index].style.opacity = 0;
        })
        Flip.from(state, {
            duration: 2,
            ease: 'expo.out',
            absolute: true,
            prune: true,
            onComplete: () => {
                navigate(`episode/${id}`, {state: poster})
            }
        })
    }

    useGSAP((context) => {
        let tl = gsap.to(carouselListRef.current, { x: (carouselListRef.current?.clientWidth - window.innerWidth) * -1, ease: 'none', repeat: -1, duration: 20 })
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
    }, [animationState])

    return (
        <section className={styles.wrapper}>
            {carouselListRef && data &&
                <ul className={styles.carouselList} ref={carouselListRef}>
                    {data.map((data, index) => {
                        return (
                            <CarouselItem ref={r => listItemsRef.current[index] = r} key={index} id={index} poster={posters[data.imdbId]} animateEnter={animateEnter} animateExit={animateExit} animateState={setAnimationState} animateClick={animateClick} apiID={data.id}/>
                        )
                    })}
                </ul>
            }
            <div className={styles.shadeBorderSection} />
        </section>
    )
}

export default Carousel;