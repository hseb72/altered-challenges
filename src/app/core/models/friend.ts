export interface Friend {
    id: number;
    player: number;
    friend: number;
    knownas: string;
    status: number; // pending == NULL, accepted == 1, refused == 0
    creation: string;
    lastupdate: string;
}