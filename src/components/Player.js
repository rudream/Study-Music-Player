import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

const Player = ({
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    songInfo,
    setSongInfo,
    audioRef,
    songs,
    setSongs,
}) => {
    //Event Handlers
    const ActiveLibraryHandler = () => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
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
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        if (direction === "forward") {
            if (currentIndex !== 19) {
                setCurrentSong(songs[currentIndex + 1]);
            } else {
                setCurrentSong(songs[0]);
            }
        }
        if (direction === "back") {
            if (currentIndex !== 0) {
                setCurrentSong(songs[currentIndex - 1]);
                playAudio(isPlaying, audioRef);
                return;
            } else {
                setCurrentSong(songs[19]);
            }
        }
        playAudio(isPlaying, audioRef);
    };

    const getTime = (time) => {
        return (
            //Formats time nicely into 0:00 format
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                    }}
                    className="track"
                >
                    <input
                        type="range"
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="back"
                    size="2x"
                    icon={faAngleLeft}
                    onClick={() => skipTrackHandler("back")}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    className="forward"
                    size="2x"
                    icon={faAngleRight}
                    onClick={() => skipTrackHandler("forward")}
                />
            </div>
        </div>
    );
};

export default Player;
