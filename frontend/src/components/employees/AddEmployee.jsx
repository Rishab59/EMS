import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { fetchDept } from "../../utils/EmpHelper";


const AddEmployee = () => {
    const [depts, setDepts] = useState([]);
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const getDepts = async () => {
            const depts = await fetchDept();
            setDepts(depts);
        };
        
        getDepts();
    },[]);
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });

        try {
            const response = await axios.post(
                "http://localhost:5000/api/employee/add",
                formDataObj,
                {
                    headers: {
                        "Authorization": `Bearer ${ localStorage.getItem("token") }`,
                    },
                }                
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error);
            }
        }
    };


    return (
        <div className = "max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className = "text-2xl font-bold mb-6 text-center">
                Add New Employee
            </h2>

            <form onSubmit = { handleSubmit }>
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            type = "text"
                            name = "name"
                            placeholder = "Employee Name"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type = "email"
                            name = "email"
                            placeholder = "Employee Email"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Employee ID
                        </label>

                        <input
                            type = "text"
                            name = "employeeId"
                            placeholder = "Employee ID"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* DOB */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>

                        <input
                            type = "date"
                            name = "dob"
                            placeholder = "Employee DoB"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Gender
                        </label>

                        <select
                            name = "gender"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value = "">
                                Select Gender
                            </option>
                            <option value = "male">
                                Male
                            </option>
                            <option value = "female">
                                Female
                            </option>
                            <option value = "other">
                                Other
                            </option>
                        </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Marital Status
                        </label>

                        <select
                            name = "maritalStatus"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value = "">
                                Select Marital Status
                            </option>
                            <option value = "single">
                                Single
                            </option>
                            <option value = "married">
                                Married
                            </option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Designation
                        </label>

                        <input
                            type = "text"
                            name = "designation"
                            placeholder = "Employee Designation"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Department
                        </label>

                        <select
                            name = "department"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value = "">
                                Select Department
                            </option>

                            {
                                depts.map((dept) => (
                                    <option
                                        key = { dept._id }
                                        value = { dept._id }
                                    >
                                        { dept.dept_name }
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Salary
                            <span className = "text-gray-400 text-sm ml-2 italic">
                                (in Rupees (₹.))
                            </span>
                        </label>

                        <input
                            type = "number"
                            name = "salary"
                            placeholder = "Employee Salary"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type = "password"
                            name = "password"
                            placeholder = "********"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Role
                        </label>

                        <select
                            name = "role"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value = "">
                                Select Role
                            </option>
                            <option value = "admin">
                                Admin
                            </option>
                            <option value = "employee">
                                Employee
                            </option>
                        </select>
                    </div>

                    {/* Image Uplaod */}
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>

                        <input
                            type = "file"
                            name = "image"
                            accept = "image/*"
                            onChange = { handleChange }
                            className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            // required
                        />
                    </div>
                </div>

                <div className = "flex justify-center">
                    <button
                        type = "submit"
                        className = "w-1/2 mt-6 px-4 py-2 bg-teal-600 text-white rounded-xl shadow-md"
                    >
                        Add Employee                    
                    </button>
                </div>
            </form>
        </div>
    );
};


export default AddEmployee;
