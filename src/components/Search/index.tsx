import styles from './style.module.scss';
import gsap from "gsap";

const SearchBar = () => {
    const onEnter = () => {
        gsap.to(`.${styles.wrapper}`, { backgroundColor: 'transparent', scale: 1.025, ease: 'power2.inOut', duration: .3})
    }

    const onExit = () => {
        gsap.to(`.${styles.wrapper}`, { backgroundColor: 'rgb(20,20,20)', scale: 1, ease: 'power2.out', duration: .2})
    }

    return(
        <input 
            type="text"
            id='SEARCH'
            placeholder="Search episodes..."
            onFocus={onEnter}
            onBlur={onExit}
            className={styles.wrapper}
        />
    )
}

export default SearchBar;