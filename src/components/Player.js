import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
    faSyncAlt,
    faCircle,
    faRandom,
} from "@fortawesome/free-solid-svg-icons";

import { playAudio } from "../util";

const Player = ({
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    currentSong,
    songs,
    setCurrentSong,
    isShuffling,
    setIsShuffling,
    isLooping,
    setIsLooping,
    activeLibraryHandler,
}) => {
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };
    //Event Handlers
    function getTime(time) {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
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
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );

        if (direction === "skip-forward") {
            if (!isShuffling) {
                await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
                activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
            } else if (isShuffling) {
                let randomSongIndex = Math.floor(Math.random() * songs.length);
                await setCurrentSong(songs[randomSongIndex]);
                activeLibraryHandler(songs[randomSongIndex]);
            }
        }
        if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    };

    const shuffleButtonHandler = () => {
        if (isShuffling) {
            setIsShuffling(false);
        } else if (!isShuffling) {
            setIsShuffling(true);
        }
    };

    const loopButtonHandler = () => {
        if (isLooping) {
            setIsLooping(false);
        } else if (!isLooping) {
            setIsLooping(true);
        }
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
                    }}
                    className="track"
                >
                    <input
                        value={songInfo.currentTime}
                        type="range"
                        max={songInfo.duration || 0}
                        min={0}
                        onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-back")}
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />
                <div
                    className={`shuffle-button ${
                        isShuffling ? "shuffle-button-on" : ""
                    }`}
                    onClick={shuffleButtonHandler}
                >
                    <FontAwesomeIcon size="2x" icon={faRandom} />
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={`shuffle-button-circle ${
                            isShuffling ? "shuffle-button-circle-on" : ""
                        }`}
                    />
                </div>
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <div
                    className={`loop-button ${
                        isLooping ? "loop-button-on" : ""
                    }`}
                    onClick={loopButtonHandler}
                >
                    <FontAwesomeIcon id="icon" size="2x" icon={faSyncAlt} />
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={`loop-button-circle ${
                            isLooping ? "loop-button-circle-on" : ""
                        }`}
                    />
                </div>

                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                    onClick={() => skipTrackHandler("skip-forward")}
                />
            </div>
        </div>
    );
};

export default Player;
