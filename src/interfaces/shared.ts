export interface Fighter {
    name: string;
    position: number,
    points: number,
    advantages: number,
    penalties: number
}

export interface PlayerOptions {
    height: string;
    width: string;
    playerVars: {
        mute: number;
        autoplay: number;
    };
}

export interface YouTubePlayer {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number): void;
    setVolume(volume: number): void; // Volume between 0 and 1
    mute(): void;
    unmute(): void;
    isMuted(): boolean;
    getCurrentTime(): number;
    getPlayerState(): number; // Player states (unstarted, ended, playing, etc.)
    getDuration(): number;
}