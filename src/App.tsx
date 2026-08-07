import {Sidebar} from './components/layout/Sidebar';
import styles from './App.module.css';

function App(){
  return (
    <div className={styles.shell}>
      <Sidebar />

      <main className={styles.main}>
        <h2>Gamer Bros</h2>
        <p>Your group dashboard will appear here.</p>
      </main>
    </div>
  );
}

export default App;

