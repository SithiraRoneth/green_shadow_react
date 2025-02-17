export class Field {
    fieldCode : string;
    fieldName : string;
    image : BinaryData;
    fieldLocation : string;

    constructor(fieldCode : string, fieldName : string, image : BinaryData, fieldLocation : string) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.image = image;
        this.fieldLocation = fieldLocation;
    }
}