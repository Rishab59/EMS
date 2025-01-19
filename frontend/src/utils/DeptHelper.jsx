import { useNavigate } from "react-router-dom";
import axios from "axios";


export const columns = [
    {
        name: "Sl.No",
        // selector: (row) => row.sno,
        selector: (row, index) => index + 1,
    },
    {
        name: "Department Name",
        selector: (row) => row.dept_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

export const DeptBtns = ({ deptId, onDeptDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (deptId) => {
        const confirm = window.confirm("Are you sure you want to delete this department?");

        if (!confirm) {
            return;
        }
        
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/department/${ deptId }`,
                {
                    headers: {
                        "Authorization": `Bearer ${ localStorage.getItem("token") }`,
                    },
                },
            );

            if (response.data.success) {
                onDeptDelete(deptId);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error);
            }
        }
    };


    return (
        <div className = "flex space-x-3">
            <button
                onClick = { () => navigate(`/admin-dashboard/department/${ deptId }`) }
                className = "px-3 py-1 bg-teal-600 text-white rounded w-16"
            >
                Edit
            </button>

            <button
                onClick = { () => handleDelete(deptId) }
                className = "px-3 py-1 bg-red-600 text-white rounded w-16"
            >
                Delete
            </button>
        </div>
    );
};
