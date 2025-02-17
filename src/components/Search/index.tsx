import styles from './style.module.scss';
import gsap from "gsap";

const SearchBar = () => {
    const onEnter = () => {}
    const onExit = () => {}

    return(
        <input 
            type="text"
            placeholder="Search episodes..."
            onFocus={onEnter}
            className={styles.wrapper}
        />
    )
}

export default SearchBar;