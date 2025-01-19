import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dept_name: "",
        dept_description: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDepartment({
            ...department,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/department/add",
                department,
                {
                    headers: {
                        "Authorization": `Bearer ${ localStorage.getItem("token") }`,
                    },
                }                
            );

            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error);
            }
        }
    };


    return (
        <div className = "max-w-3xl mx-auto p-8 mt-10 bg-white rounded-md shadow-md w-96">
            <h2 className = "text-2xl font-bold mb-6 text-center">
                Add New Department
            </h2>

            <form onSubmit = { handleSubmit }>
                <div>
                    <label
                        htmlFor = "dept_name"
                        className = "text-sm font-medium text-gray-700"
                    >
                        Department Name
                    </label>

                    <input
                        type = "text"
                        name = "dept_name"
                        placeholder = "Enter Department Name"
                        onChange = { handleChange }
                        className = "mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className = "mt-3">
                    <label
                        htmlFor = "dept_description"
                        className = "block text-sm font-medium text-gray-700"    
                    >
                        Description
                        <span className = "text-gray-400 text-sm ml-2 italic">
                            (optional)
                        </span>
                    </label>

                    <textarea
                        name = "dept_description"
                        placeholder = "Enter Department Description"
                        onChange = { handleChange }
                        className = "mt-1 w-full p-2 border border-gray-300 rounded-md resize-none"
                        rows = { 4 }
                    />
                </div>

                <button
                    type = "submit"
                    className = "w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};


export default AddDepartment;