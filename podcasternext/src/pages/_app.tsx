import Header from '../components/Header'
import '../style/global.scss'
import styles from '../style/app.module.scss'
import Player from '../components/Player'


function MyApp({ Component, pageProps }) {
  return(
    <div className={styles.wraper}>
        <main>
        <Header></Header>
       <Component {...pageProps} />
       </main>
       <Player/>
    </div>
  )
}

export default MyApp
