import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import AdminSummary from "./components/dashboard/AdminSummary";

import EmployeeList from "./components/employees/EmployeeList";
import AddEmployee from "./components/employees/AddEmployee";

import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = "/"
          element = { <Navigate to = "/admin-dashboard" /> }
        />

        <Route
          path = "/login"
          element = { <Login /> }
        />

        <Route
          path = "/admin-dashboard"
          element = {
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole = { ["admin"] }>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          {/* Dashboard */}
          <Route index element = { <AdminSummary /> } />
          
          {/* Employees */}
          <Route
            path = "/admin-dashboard/employees"
            element = { <EmployeeList /> }
          />

          <Route
            path = "/admin-dashboard/add-employee"
            element = { <AddEmployee /> }
          />

          {/* Departments */}
          <Route
            path = "/admin-dashboard/departments"
            element = { <DepartmentList /> }
          />
          
          <Route
            path = "/admin-dashboard/add-department"
            element = { <AddDepartment /> }
          />
          
          <Route
            path = "/admin-dashboard/department/:deptId"
            element = { <EditDepartment /> }
          />
        </Route>

        <Route
          path = "/employee-dashboard"
          element = { <EmployeeDashboard /> }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
