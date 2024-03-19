export interface Fighter {
    name: string;
}

export interface PlayerOptions {
    height: string;
    width: string;
    playerVars: {
        mute: number;
        autoplay: number;
    };
}
