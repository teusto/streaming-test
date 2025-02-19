import styles from './style.module.scss';
import gsap from "gsap";
import debounce from 'lodash.debounce';
import { useEffect } from 'react';

type SearchInputProps = {
    onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: SearchInputProps) => {

    const debouncedSearch = debounce((value: string) => {
        onSearch(value);
    }, 300);

    const onEnter = () => {
        gsap.to(`.${styles.wrapper}`, { backgroundColor: 'transparent', scale: 1.025, ease: 'power2.inOut', duration: .3 })
    }

    const onExit = () => {
        gsap.to(`.${styles.wrapper}`, { backgroundColor: 'rgb(20,20,20)', scale: 1, ease: 'power2.out', duration: .2 })
    }

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <input
            type="text"
            id='SEARCH'
            placeholder="Search episodes..."
            onFocus={onEnter}
            onBlur={onExit}
            onChange={(e) => debouncedSearch(e.target.value)}
            className={styles.wrapper}
        />
    )
}

export default SearchBar;