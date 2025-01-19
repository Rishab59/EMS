import Department from "../models/Department.js";


const addDepartment = async (req, res) => {
    try {
        const { dept_name, dept_description } = req.body;

        const newDept = new Department({
            dept_name,
            dept_description,
        });

        await newDept.save();

        return res.status(200).json({
            success: true,
            department: newDept,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error while adding new Department"
        });
    }
};

const getDepartments = async (req, res) => {
    try {
        const depts = await Department.find();

        return res.status(200).json({
            success: true,
            departments: depts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error while fetching Departments",
        });
    }
};

const getDepartment = async (req, res) => {
    try {
        const { deptId } = req.params;

        const dept = await Department.findById({ _id: deptId });

        return res.status(200).json({
            success: true,
            department: dept,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error while getting Department Data",
        });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { deptId } = req.params;
        const { dept_name, dept_description } = req.body;

        const updateDept = await Department.findByIdAndUpdate(
            { _id: deptId }, 
            {
                dept_name,
                dept_description,
            }
        );

        return res.status(200).json({
            success: true,
            department: updateDept,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error while updating Department Data",
        });
    }
};

const deleteDept = async (req, res) => {
    try {
        const { deptId } = req.params;

        const deleteDept = await Department.findByIdAndDelete({ _id: deptId });

        return res.status(200).json({
            success: true,
            department: deleteDept,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error while deleting Department Data",
        });
    }
};


export { addDepartment, deleteDept, getDepartments, getDepartment, updateDepartment };
