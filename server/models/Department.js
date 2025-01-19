import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
    dept_name: {
        type: String,
        required: true,
    },
    dept_description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Department = mongoose.model("Department", deptSchema);


export default Department;
