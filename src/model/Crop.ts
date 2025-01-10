export class Crop {
    cropCode: string;
    cropName: string;
    cropImage:string;
    cropScientificName: string;
    cropCategory: string;
    cropSeason: string;

    constructor(cropCode:string, cropName:string,cropImage:string, cropScientificName:string, cropCategory:string, cropSeason:string) {
        this.cropCode = cropCode;
        this.cropName = cropName;
        this.cropImage = cropImage;
        this.cropScientificName = cropScientificName;
        this.cropCategory = cropCategory;
        this.cropSeason = cropSeason;
    }

}