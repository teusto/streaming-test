import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import { GET_EPISODE_BY_ID } from '../utils/graphql/queries';

const DeleteEpisode = ({ }) => {
    return (
        <div className={styles.DEWrapper} />
    )
}

const EpisodeBox = ({ controlMode }) => {
    return (
        <div className={controlMode == 'delete' ? styles.EBWrapper_animate : styles.EBWrapper}>
            {controlMode === 'delete' && <DeleteEpisode />}
        </div>
    )
}

const EpisodeData = ({controlMode, data}) => {
    return (
        <div className={controlMode == 'delete' ? styles.EDWrapper_animate : styles.EDWrapper}>
            {controlMode === 'delete' && <DeleteEpisode />}
            <p><span>{data?.seasonNumber}</span>s<span>{data?.episodeNumber}</span>ep</p>
            <p>{data?.description}</p>
        </div>
    )
}

const Series = () => {
    const [episodes, setEpisodes] = useState([])
    const [mode, setMode] = useState('default');
    const videoPlayerRef = useRef(null)

    const { id } = useParams();
    const { state } = useLocation();
    
    const { loading, error, data } = useQuery(GET_EPISODE_BY_ID, {
        variables: { episodeId: id },
    });

    useGSAP(() => {
        gsap.to(videoPlayerRef.current, { width: '100%', height: '100%' })
    })

    const enterDeleteMode = () => {
        setMode('delete');
    }

    useEffect(() => {
        console.log('warning entered delete mode')
    }, [mode])

    console.log({id, data, state})

    const episode = data?.getEpisodeById;

    return (
        <section className={styles.wrapper}>
            <div className={styles.containerVideo}>
                <div style={{backgroundImage: `url(${state})`}} className={styles.card} ref={videoPlayerRef} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <p className={styles.title}>{episode?.title} <span>{episode?.releaseDate}</span></p>
                    <p className={styles.genre}>{episode?.series}</p>
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
                    <EpisodeData controlMode={mode} data={episode}/>
                    {/* <ul className={styles.listEpisodes}>
                        {episodes.map((data, index) => {
                            return <EpisodeBox key={index} controlMode={mode} />
                        })}
                        <div className={styles.EBWrapper_create} />
                    </ul> */}
                </div>
            </div>
        </section>
    )
}

export default Series;