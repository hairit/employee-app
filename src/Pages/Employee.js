import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../CSS/Employee.css";
import call from "../Data/API";
import DataTable from "react-data-table-component";
import { formatCurrency } from "../Classes/Solver.js";
import { MdDelete } from "react-icons/md";
import { AiOutlineLeft } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AddEmployee from "../Form/AddEmployee";
import {
  addEmployee,
  setEmployees,
  updateEmployee,
  deleteEmployee,
} from "../redux/actions/employeeActions";
import moment from "moment";

const GET_METHOD = "GET";
const POST_METHOD = "POST";
const PUT_METHOD = "PUT";
const DELETE_METHOD = "DELETE";
const PATCH_METHOD = "PATCH";
const EMPLOYEE_API = "api/employee";

export default function Employee() {
  const [openFormAddEmployee, setOpenFormAddEmployee] = useState(false);
  const [searchEmployeeByName, setSearchEmployeeByName] = useState("");
  const [employee, setEmployee] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);

  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEmployees();
  }, []);
  useEffect(() => setEmployeesData(employees), []);

  const fetchEmployees = () => {
    call(GET_METHOD, EMPLOYEE_API, null)
      .then((res) => dispatch(setEmployees(res.data)))
      .catch((err) => console.log("Cannot get employees" + err));
  };
  console.log("rerender");
  const deleteHandleClick = (_id) => {
    const options = {
      title: "Notification",
      message: "Do you want to delete this employee",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeEmployee(_id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };
    confirmAlert(options);
  };
  const removeEmployee = (_id) => {
    call(DELETE_METHOD, EMPLOYEE_API + `/${_id}`, null)
      .then((res) => {
        if (res.status === 204) {
          fetchEmployees();
        }
      })
      .catch((err) => alert("Delete employee fail" + err.message));
  };

  const createEmployee = () => {
    call(POST_METHOD, EMPLOYEE_API, employee)
      .then((res) => {
        if (res.status === 201) {
          // fetchEmployees()
          dispatch(addEmployee(res.data));
          setEmployeesData(employees);
          setEmployee(null);
          setOpenFormAddEmployee(false);
        }
      })
      .catch((err) => alert("Add employee fail" + err.message));
  };

  const handleUpdateEmployee = () => {
    call(PUT_METHOD, EMPLOYEE_API + `/${employee._id}`, employee)
      .then((res) => {
        if (res.status === 200) {
          // fetchEmployees();
          dispatch(updateEmployee(res.data));
          setEmployeesData(employees);
          setEmployee(null);
          setOpenFormAddEmployee(false);
        }
      })
      .catch((err) => alert("Update employee fail" + err.message));
  };
  const searchEmployee = () => {
    if (!searchEmployeeByName) {
      fetchEmployees();
    } else {
      call(GET_METHOD, EMPLOYEE_API + `/name/${searchEmployeeByName}`, null)
        .then((res) => dispatch(setEmployees(res.data)))
        .catch((err) => console.log("Can not search employees" + err));
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Birthday",
      selector: (row) => moment(row.birthday).format("DD-MM-YYYY"),
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
    },
    {
      name: "Phone",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Position",
      selector: (row) => row.position,
    },
    {
      name: "Level",
      selector: (row) => row.level,
    },
    {
      name: "Salary",
      selector: (row) => formatCurrency("vi-VN", "currency", "VND", row.salary),
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <Button
            variant="success"
            onClick={() => {
              setEmployee(row);
              setOpenFormAddEmployee(true);
            }}
          >
            <RiEdit2Fill></RiEdit2Fill>
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteHandleClick(row._id)}
            style={{
              marginLeft: 10,
            }}
          >
            <MdDelete></MdDelete>
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="employee">
      {/* <div>{employees?.length}</div> */}

      <DataTable
        style={{ zIndex: 10 }}
        title="Employees List"
        columns={columns}
        data={employees}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="700px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <div style={{ position: "relative" }}>
            <input
              className="search-employee"
              type="text"
              placeholder="Search Employee"
              onChange={(e) =>
                setSearchEmployeeByName(e.target.value.toString())
              }
            />
            <button className="search-button" onClick={() => searchEmployee()}>
              <ImSearch></ImSearch>
            </button>
          </div>
        }
        subHeaderAlign="right"
      ></DataTable>

      <div
        className={
          openFormAddEmployee === true ? "form-employee-open" : "form-employee"
        }
      >
        <div className="button-open">
          <AiOutlineLeft
            style={{
              fontSize: 20,
              transform:
                openFormAddEmployee === true ? "rotate(3.142rad)" : null,
              transition: "0.5s",
            }}
            onClick={() => {
              setOpenFormAddEmployee(!openFormAddEmployee);
              setEmployee(null);
            }}
          ></AiOutlineLeft>
        </div>
        <AddEmployee
          employee={employee}
          createEmployee={createEmployee}
          setEmployee={setEmployee}
          handleUpdateEmployee={handleUpdateEmployee}
          openFormAddEmployee={openFormAddEmployee}
        ></AddEmployee>
      </div>
    </div>
  );
}
