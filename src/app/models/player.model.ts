import TeamModel from "./team.model";

export default class PlayerModel {
    id?: string;
    teamId?: string;
    firstName: string;
    lastName: string;
    position: string;
    nationality: string;
    team?: TeamModel;

    constructor() {
        this.id = '';
        this.teamId = '';
        this.firstName = '';
        this.lastName = '';
        this.position = '';
        this.nationality = '';
        this.team = new TeamModel;
    }
}
