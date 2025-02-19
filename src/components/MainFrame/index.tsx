import Carousel from '../Carousel';
import SearchBar from '../Search';
import styles from './style.module.scss';
import { useLazyQuery } from '@apollo/client';
import { LIST_EPISODES } from '../../utils/graphql/queries';
import { useEffect } from 'react';
import CreateEpisodeCard from '../CreateEpisode';
import NotificationsBox from '../Notifications';

const MainFrame = () => {
    const [executeSearch, { data, loading }] = useLazyQuery(LIST_EPISODES);

    const handleSearch = (searchTerm: string) => {
        executeSearch({
            variables: { search: searchTerm }
        });
    };

    const groupBy = (keys) => (array) =>
        Object.values(
            array.reduce((objectsByKeyValue, obj) => {
                const value = keys.map((key) => obj[key]).join('-');
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {})
        );

    useEffect(() => {
        executeSearch()
    }, [])

    // not used but the idea was to group and show by series and the page would list all the episodes
    let groupedBySeries = data && groupBy(['series'])(data.listEpisodes)
    console.log({ groupedBySeries })


    return (
        <section className={styles.wrapper}>
            {/* Subscription Box -  */}
            <NotificationsBox />
            {/* Subscription Box -  */}
            <CreateEpisodeCard />
            <div className={styles.top}>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.bottom}>
                {data &&
                    <Carousel data={data.listEpisodes} />
                }
            </div>
        </section>
    )
}

export default MainFrame;