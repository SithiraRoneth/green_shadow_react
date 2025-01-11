export class Equipment {
    equipId: string;
    equipName: string;
    equipType: string;

    constructor(equipId: string, equipName: string, equipType: string) {
        this.equipId = equipId;
        this.equipName = equipName;
        this.equipType = equipType;
    }
}