export class Field {
    fieldCode : string;
    fieldName : string;
    fieldImage : string;
    fieldLocation : string;

    constructor(fieldCode : string, fieldName : string, fieldImage : string, fieldLocation : string) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldImage = fieldImage;
        this.fieldLocation = fieldLocation;
    }
}