import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";


const EmployeeList = () => {
    return (
                    <div className = "p-5">
                        <div className = "text-center">
                            <h3 className = "text-2xl font-bold mt-6">
                                Manage Employees
                            </h3>
                        </div>

                        <div className = "flex items-center justify-between">
                            <div className = "px-4 py-0.5 border rounded-md shadow-md bg-white flex items-center h-8 gap-4">
                                <FaSearch
                                    className = "inline-block text-gray-400"
                                    size = "1.2em"
                                />

                                <input
                                    type = "text"
                                    placeholder = "Search by Employee ID"
                                    className = "focus:outline-none"
                                />
                            </div>

                            <Link
                                to = "/admin-dashboard/add-employee"
                                className = "px-4 py-1 bg-teal-600 text-white rounded-md shadow-md"
                            >
                                Add New Employee
                            </Link>
                        </div>
                    </div>
    );
};


export default EmployeeList;
