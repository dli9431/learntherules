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
