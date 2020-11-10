import React from "react";

const LibrarySong = ({ song }) => {
    return (
        <div className="library-song">
            <img src={song.cover} alt="Album Cover"></img>
            <h3>{song.name}</h3>
            <h3>{song.artist}</h3>
        </div>
    );
};

export default LibrarySong;
