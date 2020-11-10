export const playAudio = (isPlaying, audioRef) => {
    if (isPlaying) {
        console.log(isPlaying);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then((audio) => {
                audioRef.current.play();
            });
        }
    }
};
