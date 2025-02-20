export class Vehicle {
    licensePlateNo : string;
    vehicleCategory : string;
    fuelType : string;
    color : string;

    constructor(licensePlate: string, vehicleCategory : string, fuelType : string, vehicleColor : string) {
        this.licensePlateNo = licensePlate;
        this.vehicleCategory = vehicleCategory;
        this.fuelType = fuelType;
        this.color = vehicleColor;
    }
}