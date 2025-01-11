export class Vehicle {
    licensePlate : string;
    vehicleCategory : string;
    fuelType : string;
    vehicleColor : string;

    constructor(licensePlate: string, vehicleCategory : string, fuelType : string, vehicleColor : string) {
        this.licensePlate = licensePlate;
        this.vehicleCategory = vehicleCategory;
        this.fuelType = fuelType;
        this.vehicleColor = vehicleColor;
    }
}