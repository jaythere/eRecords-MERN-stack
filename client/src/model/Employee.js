class EmployeeModel {
  constructor(name, email, dob, address, age, profilePhoto) {
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.address = address;
    this.age = age;
    this.profilePhoto = profilePhoto;
  }

  getEmployee() {
    return {
      name: this.name,
      email: this.email,
      dob: this.dob,
      address: this.address,
      age: this.age,
      profilePhoto: this.profilePhoto,
    };
  }
}

export default EmployeeModel;
