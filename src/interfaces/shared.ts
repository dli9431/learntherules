export interface Fighter {
    name: string;
    position: number,
    points: number,
    advantages: number,
    penalties: number,
    sub: boolean,
    subType: string | null
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

export interface ScoreHistory {
    scoreAmount: number;
    scoreType: string;
    time: number;
    fighter: number;
    subType: string | null;
}

export interface MatchHistory {
    fighter1: Fighter;
    fighter2: Fighter;
    winner: string;
    method: string;
    ref: string;
    date: string;
    history: ScoreHistory[];
}