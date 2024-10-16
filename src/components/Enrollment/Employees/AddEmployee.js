import React, { useState, useRef } from "react";
import Department from "../Department/department";
// import "../../AddVisitors/addvisitors.css";
import "./employees.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import WebcamModal from "./webcam"; // Import the WebcamModal component

const AddEmployee = ({ setData, setActiveTab, data }) => {
  const [selectedPage, setSelectedPage] = useState("");
  const [isWebcamOpen, setIsWebcamOpen] = useState(false); // State to control webcam modal visibility

  const [newEmployee, setNewEmployee] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    picture: "",
    enrollSite: "",
    gender: "",
    joiningDate: "",
    bankName: "",
    overtimeAssigned: "",
    department: "",
    designationName: "",
    basicSalary: "",
    accountNo: "",
    salaryPeriod: "",
    salaryType: "",
    enableAttendance: "",
    enableSchedule: "",
    enableOvertime: "",
  });

  const [departments, setDepartments] = useState([
    "IT",
    "HR",
    "Finance",
    "Marketing",
    "R&D",
    "Sales",
    "Admin",
  ]);
  const handleDepartmentChange = (event) => {
    const { value } = event.target;

    if (value === "Add-Department") {
      setSelectedPage("Department");
    } else {
      setNewEmployee({ ...newEmployee, department: value });
    }
  };

  const addEmployees = async () => {
    const employeeData  = {
      employeeId: newEmployee.employeeId,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      contactNo: newEmployee.contactNo,
      picture: newEmployee.picture,
      enrollSite: newEmployee.enrollSite,
      gender: newEmployee.gender,
      joiningDate: newEmployee.joiningDate,
      bankName: newEmployee.bankName,
      overtimeAssigned: newEmployee.overtimeAssigned,
      department: newEmployee.department,
      designationName: newEmployee.designationName,
      basicSalary: newEmployee.basicSalary,
      accountNo: newEmployee.accountNo,
      salaryPeriod: newEmployee.salaryPeriod,
      salaryType: newEmployee.salaryType,
      enableAttendance: newEmployee.enableAttendance,
      enableSchedule: newEmployee.enableSchedule,
      enableOvertime: newEmployee.enableOvertime,
    };

    try {
      axios.post('http://localhost:5000/api/addEmployees', employeeData );
      console.log(employeeData );
      setSelectedPage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a new FormData object
    const formData = new FormData();
    
    // Append all employee details
    Object.keys(newEmployee).forEach(key => {
        formData.append(key, newEmployee[key]);
    });

    try {
        const response = await axios.post(
            "http://localhost:5000/api/addEmployees", // Make sure this matches your backend endpoint
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        if (response.status === 201) { // Check for 201 status code for successful creation
            setData((prevData) => [...prevData, response.data]); // Update state with new employee
            setActiveTab("Employees");

            // Reset form fields after successful submission
            setNewEmployee({
                employeeId: "",
                firstName: "",
                lastName: "",
                email: "",
                contactNo: "",
                picture: "",
                enrollSite: "",
                gender: "",
                joiningDate: "",
                bankName: "",
                overtimeAssigned: "",
                department: "",
                designationName: "",
                basicSalary: "",
                accountNo: "",
                salaryPeriod: "",
                salaryType: "",
                enableAttendance: "",
                enableSchedule: "",
                enableOvertime: "",
            });
        } else {
            console.error("Failed to add employee:", response);
        }
    } catch (error) {
        console.error("Error adding new employee:", error.response ? error.response.data : error.message);
    }
};

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewEmployee((prevState) => ({ ...prevState, picture: file })); // Store the file object
  }
    // if (file) {
    //   const formData = new FormData();
    //   formData.append("picture", file);

    //   try {
    //     const response = await axios.post(
    //       "http://localhost:5000/api/upload",
    //       formData
    //     );
    //     const imageUrl = response.data.imageUrl;
    //     setNewEmployee((prevState) => ({ ...prevState, picture: imageUrl }));
    //   } catch (error) {
    //     console.error("Error uploading picture:", error);
    //   }
    // }
  };

  const handleWebcamCapture = (imageSrc) => {
    // Update the state with the captured image
    setNewEmployee((prevState) => ({
      ...prevState,
      picture: imageSrc, // Store the imageSrc in the 'picture' field
    }));
  };

  return (
    <div className="add-employee-main">
      <div>
        <button
          onClick={() => setActiveTab("Employees")}
          className="back-button"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      {selectedPage === "Department" ? (
        <Department setSelectedPage={setSelectedPage} />
      ) : (
        <form onSubmit={handleSubmit} className="employee-form">
          <section>
            <h1>Employee Information</h1>
            <div className="employee-main">
              <div className="employee-upper">
                <div className="employee-info-inner">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    placeholder="Enter Employee ID"
                    value={newEmployee.employeeId}
                    onChange={handleChange}
                    required
                  />

                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={newEmployee.firstName}
                    onChange={handleChange}
                    required
                  />

                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={newEmployee.lastName}
                    onChange={handleChange}
                    required
                  />

                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={newEmployee.email}
                    onChange={handleChange}
                    required
                  />

                  <label>Contact No</label>
                  <input
                    type="text"
                    name="contactNo"
                    placeholder="Enter Contact Number"
                    value={newEmployee.contactNo}
                    onChange={handleChange}
                    required
                  />

                  <label>Picture</label>
                  <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handlePictureChange}
                  />
                  <button
                    type="button"
                    onClick={() => setIsWebcamOpen(true)}
                    className="webcam-button"
                  >
                    Capture Picture with Webcam
                  </button>
                  {newEmployee.picture && (
                    <div className="captured-image-container">
                      <img
                        src={newEmployee.picture}
                        alt="Captured"
                        className="captured-image"
                      />
                    </div>
                  )}
                  <WebcamModal
                    isOpen={isWebcamOpen}
                    onClose={() => setIsWebcamOpen(false)}
                    onCapture={handleWebcamCapture}
                  />
                  <label>Enrolled Site</label>
                  <input
                    type="text"
                    name="enrollSite"
                    placeholder="Enter Enrolled Site"
                    value={newEmployee.enrollSite}
                    onChange={handleChange}
                  />

                  <label>Gender</label>
                  <select
                    name="gender"
                    value={newEmployee.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <label>Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={newEmployee.joiningDate}
                    onChange={handleChange}
                    required
                  />

                  <label>Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Enter Bank Name"
                    value={newEmployee.bankName}
                    onChange={handleChange}
                  />
                </div>
                <div className="employee-info-inner">
                  <label>Overtime Assigned</label>
                  <select
                    name="overtimeAssigned"
                    value={newEmployee.overtimeAssigned}
                    onChange={handleChange}
                  >
                    <option value="">Select Overtime</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <label>Department Name</label>
                  <select
                    name="department"
                    value={newEmployee.department}
                    onChange={handleDepartmentChange}
                  >
                    <option value="" disabled>
                      Select a Department
                    </option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                    <option value="Add-Department">+ Add New Department</option>
                  </select>

                  <label>Designation Name</label>
                  <input
                    type="text"
                    name="designationName"
                    placeholder="Enter Designation"
                    value={newEmployee.designationName}
                    onChange={handleChange}
                  />

                  <label>Basic Salary</label>
                  <input
                    type="number"
                    name="basicSalary"
                    placeholder="Enter Basic Salary"
                    value={newEmployee.basicSalary}
                    onChange={handleChange}
                    required
                  />

                  <label>Account No</label>
                  <input
                    type="text"
                    name="accountNo"
                    placeholder="Enter Account Number"
                    value={newEmployee.accountNo}
                    onChange={handleChange}
                  />

                  <label>Salary Period</label>
                  <select
                    name="salaryPeriod"
                    value={newEmployee.salaryPeriod}
                    onChange={handleChange}
                  >
                    <option value="">Select Salary Period</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Weekly">Weekly</option>
                  </select>

                  <label>Salary Type</label>
                  <select
                    name="salaryType"
                    value={newEmployee.salaryType}
                    onChange={handleChange}
                  >
                    <option value="">Select Salary Type</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Hourly">Hourly</option>
                  </select>

                  <label>Enable Attendance</label>
                  <select
                    name="enableAttendance"
                    value={newEmployee.enableAttendance}
                    onChange={handleChange}
                  >
                    <option value="">Select Attendance Status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <label>Enable Schedule</label>
                  <select
                    name="enableSchedule"
                    value={newEmployee.enableSchedule}
                    onChange={handleChange}
                  >
                    <option value="">Select Schedule Status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <label>Enable Overtime</label>
                  <select
                    name="enableOvertime"
                    value={newEmployee.enableOvertime}
                    onChange={handleChange}
                  >
                    <option value="">Select Overtime Status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="employee-buttons">
                <button className="add" type="submit" >
                  Add Employee
                </button>
                <button
                  className="cancel"
                  type="button"
                  onClick={() => setActiveTab("Employees")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </form>
      )}
    </div>
  );
};

export default AddEmployee;