import gsap from "gsap";

const SearchBar = () => {
    const onEnter = () => {}
    const onExit = () => {}

    return(
        <input 
            type="text"
            placeholder="Search episodes..."
            onFocus={onEnter}
        />
    )
}

export default SearchBar;