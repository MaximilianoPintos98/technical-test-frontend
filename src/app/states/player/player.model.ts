import PlayerModel from "src/app/models/player.model";

export default class PlayerStore {
    current?: PlayerModel;
    players?: PlayerModel [];
    reload?: boolean;
} 