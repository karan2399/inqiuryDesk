export class StatusModel {
    statusId: number;
    statusName: string;
    isActive: boolean;

    constructor() {
        this.statusId = 0;
        this.statusName = "";
        this.isActive = false;
    }
}