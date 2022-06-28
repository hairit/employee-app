import React from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
// import { getEmployee } from "../Features/Employee";

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
import AddEmployee from "../Components/AddEmployee";
import { getEmployees } from "../redux/actions/employeeActions";
import axios from "axios";
import { URL } from "../Data/URL";
import moment from "moment";

export default function Employee() {
  const [openFormAddEmployee, setOpenFormAddEmployee] = useState(false);
  const [openAddEmployeeButton, setOpenAddEmployeeButton] = useState(true);
  const [searchByName, setSearchByName] = useState("");
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState(null);

  // const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchEmployees();
    // getEmployees();
  }, []);
  const fetchEmployees = async () => {
    const response = await axios
      .get(URL + "/api/employee")
      .catch((err) => console.log("Cannot get employees"));
    dispatch(getEmployees(response.data));
  };
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
    call("DELETE", `/api/employee/${_id}`, null)
      .then((res) => {
        if (res.status === 204) {
          fetchEmployees();
          getEmployees();
        }
      })
      .catch((err) => alert("Delete employee fail" + err.message));
  };
  const createEmployee = () => {
    call("POST", "/api/employee", employee)
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          fetchEmployees();
          setEmployee(null);
          setOpenFormAddEmployee(false);
        }
      })
      .catch((err) => alert("Add employee fail" + err.message));
  };
  const updateEmployee = () => {
    call("PUT", `/api/employee/${employee._id}`, employee)
      .then((res) => {
        if (res.status === 200) {
          fetchEmployees();
          setEmployee(null);
          setOpenFormAddEmployee(false);
        }
      })
      .catch((err) => alert("Update employee fail" + err.message));
  };
  const searchEmployee = async () => {
    if (searchByName === "") {
      alert("No employee name to search");
      return;
    } else {
      const response = await axios
        .get(URL + `/api/employee/name/${searchByName}`)
        .catch((err) => console.log("Can not search employees by Name"));
      dispatch(getEmployees(response.data));
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Birthday",
      selector: (row) => moment(row.birthday).format("yyyy-MM-DD"),
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
              setOpenAddEmployeeButton(false);
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
  // console.log(employee);
  return (
    <div className="employee">
      <DataTable
        style={{ zIndex: 10 }}
        title="Employees List"
        columns={columns}
        data={employees}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <div style={{ position: "relative" }}>
            <input
              className="search-employee"
              type="text"
              placeholder="Search Employee"
              onChange={(e) => setSearchByName(e.target.value.toString())}
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
          updateEmployee={updateEmployee}
          openFormAddEmployee={openFormAddEmployee}
        ></AddEmployee>
      </div>
    </div>
  );
}
