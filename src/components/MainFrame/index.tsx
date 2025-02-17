import Carousel from '../Carousel';
import SearchBar from '../Search';
import styles from './style.module.scss';

const MainFrame = () => {
    return(
        <section className={styles.wrapper}>
            <div className={styles.top}>
                <SearchBar />
            </div>
            <div className={styles.bottom}>
                <Carousel />
            </div>
        </section>
    )
}

export default MainFrame;