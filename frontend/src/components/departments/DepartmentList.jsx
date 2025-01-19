import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

import { FaSearch } from "react-icons/fa";

import { columns, DeptBtns } from "../../utils/DeptHelper";


const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [deptLoading, setDeptLoading] = useState(false);
    const [filteredDepts, setFilteredDepts] = useState([]);

    const onDeptDelete = (deptId) => {
        const data = departments.filter((dept) => dept._id !== deptId);
        setDepartments(data);
    };

    const filterDepts = (e) => {
        const records = departments.filter((dept) => dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase()));
    
        setFilteredDepts(records);
    };
    


    useEffect(() => {
        const fetchDept = async () => {
            setDeptLoading(true);

            try {
                const response = await axios.get(
                    "http://localhost:5000/api/department",
                    {
                        headers: {
                            "Authorization": `Bearer ${ localStorage.getItem("token") }`,
                        },
                    },
                );
    
                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.departments.map((dept) => (
                        {
                            _id: dept._id,
                            sno: sno++,
                            dept_name: dept.dept_name,
                            action: (
                                <DeptBtns
                                    deptId = { dept._id }
                                    onDeptDelete = { onDeptDelete }
                                />
                            ),
                        }
                    ));

                    setDepartments(data);
                    setFilteredDepts(data);
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


    return (
        <>
            {
                deptLoading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div className = "p-5">
                        <div className = "text-center">
                            <h3 className = "text-2xl font-bold mt-6">
                                Manage Departments
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
                                    placeholder = "Search by dept name"
                                    onChange = { filterDepts }
                                    className = "focus:outline-none"
                                />
                            </div>

                            <Link
                                to = "/admin-dashboard/add-department"
                                className = "px-4 py-1 bg-teal-600 text-white rounded-md shadow-md"
                            >
                                Add New Department
                            </Link>
                        </div>

                        <div className = "mt-5 border rounded-md shadow-xl">
                            <DataTable
                                columns = { columns }
                                data = { filteredDepts }
                                pagination
                                paginationPerPage = { 5 }
                                paginationRowsPerPageOptions = {[5, 10, 15, 20]} 
                                striped
                                defaultSortFieldId = { 2 } // Default sort by Department Name
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
};


export default DepartmentList;
