import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMutation, useQuery } from '@apollo/client';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GET_EPISODE_BY_ID } from '../utils/graphql/queries';
import { DELETE_EPISODE } from '../utils/graphql/mutations';
import { CgChevronLeft, CgClose } from "react-icons/cg";

const DeleteEpisode = ({id }) => {
    const navigate = useNavigate();
    const [deleteEpisode, { loading }] = useMutation(DELETE_EPISODE);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!id) return;
    
        try {
          await deleteEpisode({
            variables: { episodeId: id },
            update(cache) {
              cache.modify({
                fields: {
                  listEpisodes(existingEpisodes = [], { readField }) {
                    return existingEpisodes.filter(
                      (episodeRef: any) => id !== readField('id', episodeRef)
                    );
                  },
                },
              });
            },
          });
          navigate(-1);
        } catch (err) {
          setError('Failed to delete episode');
        }
      };

    error && <p className={styles.error}>{error}</p>
    return (
        <div className={styles.DEWrapper} children={<CgClose />} onClick={handleDelete}/>
    )
}

// const EpisodeBox = ({ controlMode }) => {
//     return (
//         <div className={controlMode == 'delete' ? styles.EBWrapper_animate : styles.EBWrapper}>
//             {controlMode === 'delete' && <DeleteEpisode />}
//         </div>
//     )
// }

const EpisodeData = ({ controlMode, data}) => {
    return (
        <div className={controlMode == 'delete' ? styles.EDWrapper_animate : styles.EDWrapper}>
            {controlMode === 'delete' && <DeleteEpisode id={data?.id}/>}
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
    const navigate = useNavigate();

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

    const episode = data?.getEpisodeById;

    return (
        <section className={styles.wrapper}>
            <div className={styles.containerVideo}>
                <div style={{ backgroundImage: `url(${state})` }} className={styles.card} ref={videoPlayerRef} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <p className={styles.title}>{episode?.title} <span>{episode?.releaseDate}</span></p>
                    <p className={styles.genre}>{episode?.series}</p>
                    <div className={styles.btnContainer}>
                        <div className={styles.navigateContainer} role='button' onClick={() => navigate(-1)}>
                            <CgChevronLeft />
                        </div>
                        <div className={styles.deleteContainer} role='button' onClick={enterDeleteMode}>
                            Delete
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <EpisodeData controlMode={mode} data={episode} />
                    {/* <ul className={styles.listEpisodes}>
                        {episodes.map((data, index) => {
                            return <EpisodeBox key={index} controlMode={mode} />
                        })}
                        <div className={styles.EBWrapper_create} />
                    </ul> - This was a list of episodes by tv show, so if the page was abou the show and not the episode */}
                </div>
            </div>
        </section>
    )
}

export default Series;