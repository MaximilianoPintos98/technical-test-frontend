export default class PlayerPostModel {
    teamId?: string;
    firstName: string;
    lastName: string;
    position: string;
    nationality: string;

    constructor() {
        this.teamId = '';
        this.firstName = '';
        this.lastName = '';
        this.position = '';
        this.nationality = '';
    }
}
