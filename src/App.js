import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./songData";
import "./styles/app.scss";

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
            />
        </div>
    );
}

export default App;
