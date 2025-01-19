import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const EditDepartment = () => {
    const { deptId } = useParams();

    const [department, setDepartment] = useState([]);
    const [deptLoading, setDeptLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDept = async () => {
            setDeptLoading(true);

            try {
                const response = await axios.get(
                    `http://localhost:5000/api/department/${ deptId }`,
                    {
                        headers: {
                            "Authorization": `Bearer ${ localStorage.getItem("token") }`,
                        },
                    },
                );
    
                if (response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error);
                }
            } finally {
                setDeptLoading(false);
            }
        };

        fetchDept();
    }, []);

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
            const response = await axios.put(
                `http://localhost:5000/api/department/${ deptId }`,
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
        <>
            {
                deptLoading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div className = "max-w-3xl mx-auto p-8 mt-10 bg-white rounded-md shadow-md w-96">
                        <h2 className = "text-2xl font-bold mb-6 text-center">
                            Edit Department
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
                                    value = { department.dept_name }
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
                                    value = { department.dept_description }
                                    onChange = { handleChange }
                                    className = "mt-1 w-full p-2 border border-gray-300 rounded-md resize-none"
                                    rows = { 4 }
                                />
                            </div>

                            <button
                                type = "submit"
                                className = "w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md"
                            >
                                Edit Department
                            </button>
                        </form>
                    </div>
                )
            }
        </>
    );
};


export default EditDepartment;
