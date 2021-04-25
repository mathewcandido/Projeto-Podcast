import { createContext, ReactNode, useContext, useState } from 'react'
import Episode from '../pages/episodes/[slug]';



type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayingState: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
    setPlayingState: (state: boolean) => void;
}


//oque eu passo dentro do createContext é só para dizer o tipo de dado que eu estarei passando 
//uma string por exemplo pode deixar vazio os campos 
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProvideProps = {
    children: ReactNode;
}

export function PlayerContextProvide({ children }: PlayerContextProvideProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping,setIsLooping] = useState(false);
    const [isShuffling,setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }



    function togglePlay() {
        setIsPlaying(!isPlaying);
    }
    
    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayingState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if( isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random( ) * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }
       else  if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }

    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }



    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                isPlaying,
                isLooping,
                isShuffling,
                togglePlay,
                playList,
                playNext,
                playPrevious,
                hasNext,
                toggleLoop,
                hasPrevious,
                toggleShuffle,
                setPlayingState,
                clearPlayingState,
            }}>
            {children}
        </PlayerContext.Provider>
    )
}


export const usePlayer = () => {
    return useContext(PlayerContext)
}