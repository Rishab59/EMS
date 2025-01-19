import axios from "axios";


export const fetchDept = async () => {
    let depts;
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
            depts = response.data.departments;
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            console.log(error.response.data.error);
        }
    }

    return depts;
};
