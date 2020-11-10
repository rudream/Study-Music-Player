import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
    song,
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
    id,
}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        const newSongs = songs.map((song) => {
            if (song.id === id) {
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
        playAudio(isPlaying, audioRef);
    };
    return (
        <div
            onClick={songSelectHandler}
            className={`library-song ${song.active ? "selected" : ""}`}
        >
            <img src={song.thumbnailCover} alt="Album Cover"></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
