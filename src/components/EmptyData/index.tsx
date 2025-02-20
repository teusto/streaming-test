import styles from './style.module.scss';

const EmptyData = ({message= 'No data found'}) => {
    return (
        <div className={styles.wrapper}>
            <p>{message}</p>
        </div>
    )
    
}

export default EmptyData;