export class Crop {
    cropCode: string;
    cropName: string;
    image:BinaryData;
    cropScientificName: string;
    cropCategory: string;
    cropSeason: string;

    constructor(cropCode:string, cropName:string,image:BinaryData, cropScientificName:string, cropCategory:string, cropSeason:string) {
        this.cropCode = cropCode;
        this.cropName = cropName;
        this.image = image;
        this.cropScientificName = cropScientificName;
        this.cropCategory = cropCategory;
        this.cropSeason = cropSeason;
    }

}