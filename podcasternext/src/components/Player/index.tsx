
import { useContext, useRef, useEffect, useState} from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePlayer } from '../../context/playerContext';
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';


//por conta do module o react ele não reconhece. então importamos como um arquivo comum  

export default function Player() {
    const audioRef = useRef<HTMLAudioElement>(null)
    
    const [progress,setProgress] = useState(0);
   
    const {
         episodeList,
          currentEpisodeIndex ,
          isPlaying,  
          isLooping,
          isShuffling,
          togglePlay,
          toggleShuffle,
          setPlayingState,
          playNext,
          hasNext,
          hasPrevious,
          toggleLoop,
          playPrevious,
          clearPlayingState,
    } = usePlayer();

    useEffect(()=>{
        if(!audioRef.current){
            return;
        }
        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    },[isPlaying])

    function setupProgressListener(){
        audioRef.current.currentTime = 0;
        
        audioRef.current.addEventListener('timeupdate',() =>{
            setProgress(Math.floor(audioRef.current.currentTime));
        })
        
    }
    function handleSeek(amount:number){
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded(){
        if(hasNext){
            playNext()
        }else {
            clearPlayingState()
        }
    }

    const episode = episodeList[currentEpisodeIndex]
    return (

        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando Agora</strong>
            </header>

            {episode ? (
                <div className={styles.currentEpisode}>

                    <Image width={452} height={452} src={episode.thumbnail} objectFit="cover" />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um Podcast para ouvir </strong>
                </div>
            )}


            <footer className={!episode ? styles.empty : ""}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress) }</span>

                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{borderColor:'#04d361', borderWidth:4 }}

                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}

                    </div>

                    <span>{convertDurationToTimeString(episode?.duration ?? 0) }</span>
                </div>
                    
                    {episode && (
                        <audio
                            src={episode.url}
                            ref={audioRef}
                            autoPlay
                            loop={isLooping}
                            onEnded={handleEpisodeEnded}
                            onPlay ={()=>setPlayingState(true)}
                            onPause ={()=>setPlayingState(false)}
                            onLoadedMetadata={setupProgressListener}
                        />

                    )}


                <div className={styles.buttons}>

                    <button
                     type="button"
                      disabled={!episode || episodeList.length === 1}
                      onClick={toggleShuffle}
                      className={isShuffling ? styles.isActive : ''}
                      >
                        <img src="/shuffle.svg" alt="Embaralhar"  />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <img src="/play-previous.svg" alt="Tocar-anterior" />
                    </button>
                    <button 
                    type="button" 
                    className={styles.playButton} 
                    disabled={!episode}
                    onClick={togglePlay}
                    >                   
                        { isPlaying 
                         ? <img src="/pause.svg" alt="parar" />
                         : <img src="/play.svg" alt="Tocar" />  
                        }

                    </button>

                    <button type="button" onClick={playNext} disabled={!episode || !hasNext }>
                        <img src="/play-next.svg" alt="tocar-próxima" />
                    </button>
                    <button
                     onClick={toggleLoop}
                     type="button" 
                     disabled={!episode}
                     className={isLooping ? styles.isActive : ''}
                     >
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>

    );
}