import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../context/Context';
import './styles.css'

const EmployeeList = ({history}) => {
  const { state, getAllEmployee, deleteEmployee } = useContext(Context);
  const [msg, setMsg] = useState('');
  const { employees = [], loading } = state;

  useEffect(() => {
    const fetchData = async() => {
      await getAllEmployee()
    };
    fetchData()
  }, [employees.length]);
  

  const removeEmployee = async(id) => {
    const response = window.confirm('Are you sure you want to delete ?');
    if (response) {
      const message = await deleteEmployee(id);
      setMsg(message);
    }
  }

  const editEmployee = (id) => {
    history.push(`/edit/${id}`, {id: id})
  }

  const showList = () => {
    setMsg(null)
    history.push('/list')
  }

  const addMore = () => {
    history.push('/')
  }

  if (msg) {
    return (
      <div>
      <div className="alert alert-success" role="alert">
        Employee Deleted Successfully !!
      </div>
      <a href="#" className="link-success" onClick={showList}>Show Latest List</a>
    </div>
    )
  }

  if (!employees || employees && employees.length == 0) {
    return  (
      <>
      <div className="alert alert-success" role="alert">List is Empty</div>
      <a href="#" className="link-success" onClick={addMore}>Add Employee</a>
      </>
    )
  }

  return (
    <>
    {employees.map((emp) => {
      const {
        _id,
        name,
        age,
        email,
        dob,
        address,
        profilePhoto
      } = emp;
      return (
        <div key={_id} className="list-group">
          <div className="list-group-item list-group-item-action flex-column align-items-start active">
            <div className="d-flex w-100 justify-content-between">
              <span className='glyphicon glyphicon-remove remove-list' onClick={() => removeEmployee(_id)}></span>
              <span className='glyphicon glyphicon-edit edit-list' onClick={() => editEmployee(_id)}></span>
              <h5 className="mb-1">Employee Name - {name}</h5>
            </div>
            <ul className="list-group list-ground--color">
              <li className="list-group-item">Email - {email}</li>
              <li className="list-group-item">DOB - {dob}</li>
              <li className="list-group-item">Age - {age}</li>
              <li className="list-group-item">Address - {address}</li>
              <li className="list-group-item">Profile Photo - {profilePhoto}</li>
            </ul>
          </div>
        </div>
      )
    })}
    <a href="#" className="link-success" onClick={addMore}>Add More</a>
    </>
  )
}

export default EmployeeList