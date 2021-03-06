import React, { useState, useRef } from "react";
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import data
import chillHop from "./songData";
//Util
import { playAudio } from "./util";

function App() {
    //Ref
    const audioRef = useRef(null);
    const [songs, setSongs] = useState(chillHop());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [libraryStatus, setLibraryStatus] = useState(false);

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });

        setSongs(newSongs);
    };

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration: duration,
            animationPercentage: percentage,
        });
    };
    const songEndHandler = async () => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        if (!isLooping) {
            if (!isShuffling) {
                await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
                activeLibraryHandler(songs[currentIndex + 1]);
            } else if (isShuffling) {
                let randomSongIndex = Math.floor(Math.random() * songs.length);
                await setCurrentSong(songs[randomSongIndex]);
                activeLibraryHandler(songs[randomSongIndex]);
            }
        }
        playAudio(isPlaying, audioRef);
        return;
    };
    return (
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song isPlaying={isPlaying} currentSong={currentSong} />
            <Player
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                isPlaying={isPlaying}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setSongs={setSongs}
                setCurrentSong={setCurrentSong}
                activeLibraryHandler={activeLibraryHandler}
                isLooping={isLooping}
                setIsLooping={setIsLooping}
                isShuffling={isShuffling}
                setIsShuffling={setIsShuffling}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                libraryStatus={libraryStatus}
            />
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
