import Header from '../components/Header'
import '../style/global.scss'
import styles from '../style/app.module.scss'
import Player from '../components/Player'
import { PlayerContextProvide } from '../context/playerContext'

function MyApp({ Component, pageProps }) {
  
  return (
    <PlayerContextProvide>
    <div className={styles.wraper}>
        <main>
        <Header></Header>
       <Component {...pageProps} />
       </main>
       <Player/>
    </div>
   </PlayerContextProvide>
  )
}

export default MyApp
