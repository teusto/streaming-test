import MainFrame from "./components/MainFrame";
import styles from './App.module.scss';

const App = (): React.JSX.Element => {
 return(
  <section className={styles.AppWrapper} id="APP">
    <MainFrame />
  </section>
 )
}

export default App;