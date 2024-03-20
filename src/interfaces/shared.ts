export interface Fighter {
    name: string;
    position: number
}

export interface PlayerOptions {
    height: string;
    width: string;
    playerVars: {
        mute: number;
        autoplay: number;
    };
}
