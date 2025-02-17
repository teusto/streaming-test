import MainFrame from "./components/MainFrame";
import styles from './App.module.scss';

const App = (): React.JSX.Element => {
 return(
  <section className={styles.AppWrapper}>
    <MainFrame />
  </section>
 )
}

export default App;