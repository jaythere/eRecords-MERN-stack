import React, { useContext, useEffect, useState} from 'react';
import { Context } from '../context/Context';
import EmployeeModel from '../model/Employee';
import { REGEX } from '../util/constants';
import './styles.css'

const ModifyEmployee = ({history, location}) => {
  const [err, setErr] = useState('');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [age, setAge] = useState('')
  const [address, setAddress] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')
  const [showEmployeeForm, setFormVisibility] = useState(true);
  const { state, updateEmployee } = useContext(Context)

  useEffect(() => {
    const targetEmployee = state.employees.find((emp) => emp._id === location?.state?.id) || {};
    setName(targetEmployee.name)
    setEmail(targetEmployee.email)
    setDob(targetEmployee.dob)
    setAddress(targetEmployee.address)
    setAge(targetEmployee.age)
    setProfilePhoto(targetEmployee.profilePhoto)
  }, [location?.state?.id])

  const modifyEmployee = async(e) => {
    e.preventDefault();
    setErr(null);
    if (!name || !REGEX.name.test(name)) {
      setErr("Please provide valid name");
      return
    }
    if (!email || !REGEX.email.test(email)) {
      setErr("Please provide valid email address");
      return
    }
    const employee = new EmployeeModel(name, email, dob, address, age, profilePhoto);
    const employeeDetails = employee.getEmployee();
    const response = await updateEmployee({...employeeDetails, id: location?.state?.id})
    const { user, error } = response;
    if (user) {
      setFormVisibility(false);
    }
    else {
      setErr(error);
    }
  }

  const showEmployeeList = () => {
    history.push('/list')
  }

  const addMore = (e) => {
    e.preventDefault()
    setFormVisibility(true);
    setErr(null)
  }

  return (
    <>
    {
      err && <div>
      <div className="alert alert-warning" role="alert">
        {err} !!
      </div>
  </div>
    }
    {showEmployeeForm
    ? <form className='employee-form'>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail">Email</label>
          <input type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputDOB">DOB</label>
          <input type="date" defaultValue={dob} onChange={(e) => setDob(e.target.value)} className="form-control" id="exampleInputDOB" aria-describedby="dobHelp" placeholder="Enter dob" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputAge">age</label>
          <input type="number" defaultValue={age} onChange={(e) => setAge(e.target.value)} className="form-control" id="exampleInputAge" aria-describedby="ageHelp" placeholder="Enter age" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputProfilePhoto">Profile Photo</label>
          <input type="file" defaultValue={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} className="form-control" id="exampleInputProfilePhoto" aria-describedby="photoHelp" placeholder="Enter photo" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputAddress">Address</label>
          <input type="text" defaultValue={address}  onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Enter address" />
        </div>
        <button type="button" onClick={modifyEmployee} className="btn btn-primary">Submit</button>
        <button type="button" onClick={showEmployeeList} className="btn btn-primary show-all_route">Show All Employee</button>
      </form>
    : <div>
      <div className="alert alert-success" role="alert">
        Employee Updated Successfully !!
      </div>
      <div className='nav-link'>
      <a href="#" className="link-success" onClick={addMore}>Add More</a>
      <a href="#" className="link-success" onClick={showEmployeeList}>Show Latest List</a>
      </div>
    </div>}
    </>
  )
}

export default ModifyEmployee;