export class Staff {
    staffId:string;
    firstName:string;
    lastName:string;
    jobName:string;
    email:string;
    phone:number;

    constructor(staffId:string,firstName:string,lastName:string,jobName:string,email:string,phone:number){
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobName = jobName;
        this.email = email;
        this.phone = phone;
    }
}