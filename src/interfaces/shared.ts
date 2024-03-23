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
    videoTitle: string;
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

export function convertSecondsToTime(seconds: number): string {
    seconds = Math.round(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
}

export function formatResult(score: ScoreHistory, fighter1: Fighter, fighter2: Fighter): string {
    let res = '';
    if (score.subType) {
        if (score.fighter === 1) {
            res = '[' + convertSecondsToTime(score.time) + '] ' + fighter1.name + ' wins by submission (' + score.subType + ')';
        } else {
            res = '[' + convertSecondsToTime(score.time) + '] ' + fighter2.name + ' wins by submission (' + score.subType + ')';
        }
    } else {
        // only show positive scores
        if (score.scoreAmount < 1) {
            return '';
        }
        else {
            if (score.fighter === 1) {
                res = '[' + convertSecondsToTime(score.time) + '] ' + fighter1.name + ` scores ` + score.scoreAmount + ` ` + score.scoreType;
            }
            else {
                res = '[' + convertSecondsToTime(score.time) + '] ' + fighter2.name + ` scores ` + score.scoreAmount + ` ` + score.scoreType;
            }
        }
    }
    return res;
}