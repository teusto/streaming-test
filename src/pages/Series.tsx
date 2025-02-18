import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DeleteEpisode = ({}) => {
    return (
        <div className={styles.DEWrapper} />
    )
}

const EpisodeBox = ({controlMode}) => {
    return (
        <div className={styles.EBWrapper}>
            {controlMode === 'delete' && <DeleteEpisode />}
        </div>
    )
}

const Series = () => {
    const [episodes,setEpisodes] = useState([])
    const [mode, setMode] = useState('default');
    const videoPlayerRef = useRef(null)

    useGSAP(() => {
        gsap.to(videoPlayerRef.current, { width: '100%', height: '100%' })
    })

    useEffect(() => {
        let a = new Array(28).fill(0)
        setEpisodes(a)
    }, [])

    const enterDeleteMode = () => {
        setMode('delete');
    }

    useEffect(() => {
        console.log('warning entered delete mode')
    }, [mode])

    return (
        <section className={styles.wrapper}>
            <div className={styles.containerVideo}>
                <div className={styles.card} ref={videoPlayerRef} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <p className={styles.title}>Breaking Bad <span>2008 - 2013</span></p>
                    <p className={styles.genre}>Drama</p>
                    <div className={styles.btnContainer}>
                        <div className={styles.subscribeContainer}>
                            Subscribe
                        </div>
                        <div className={styles.deleteContainer} role='button' onClick={enterDeleteMode}>
                            Delete
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <ul className={styles.listEpisodes}>
                        {episodes.map((data, index) => {
                            return <EpisodeBox key={index} controlMode={mode}/>
                        })}
                        <div className={styles.EBWrapper_create} />
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Series;