import styles from './style.module.scss';
import gsap from "gsap";

const SearchBar = () => {
    const onEnter = () => {
        gsap.to(`.${styles.wrapper}`, { backgroundColor: 'transparent', scale: 1.025, ease: 'power2.inOut', duration: .3})
    }

    const onExit = () => {
        gsap.to(`.${styles.wrapper}`, { backgroundColor: 'white', scale: 1, ease: 'power2.out', duration: .3})
    }

    return(
        <input 
            type="text"
            placeholder="Search episodes..."
            onFocus={onEnter}
            onBlur={onExit}
            className={styles.wrapper}
        />
    )
}

export default SearchBar;