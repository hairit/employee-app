import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../CSS/Employee.css';
import call from '../Data/API';
import DataTable from 'react-data-table-component';
import { formatCurrency } from '../Classes/Solver.js';
import { MdDelete } from 'react-icons/md';
import { AiOutlineLeft } from 'react-icons/ai';
import { RiEdit2Fill } from 'react-icons/ri';
import { ImSearch } from 'react-icons/im';
import { Button } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import AddEmployee from '../Form/AddEmployee';
import {
  addEmployee,
  setEmployees,
  updateEmployee,
  deleteEmployee,
} from '../redux/actions/employeeActions';
import moment from 'moment';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const PUT_METHOD = 'PUT';
const DELETE_METHOD = 'DELETE';
// const PATCH_METHOD = 'PATCH';
const EMPLOYEE_API = 'api/employee';

export default function Employee() {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [pagination, setPagination] = useState(true);
  const [perPage, setPerPage] = useState(10);
  const [openFormAddEmployee, setOpenFormAddEmployee] = useState(false);
  const [searchEmployeesByName, setSearchEmployeesByName] = useState('');
  const [employee, setEmployee] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  const fetchEmployees = (perPage, page) => {
    setLoading(true);
    var paging = '';
    page && perPage
      ? (paging = `/page/${page}/perPage/${perPage}`)
      : (paging = '');
    call(GET_METHOD, EMPLOYEE_API + paging, null)
      .then((res) => {
        dispatch(setEmployees(res.data.employees));
        setEmployeesData(res.data.employees);
        setLoading(false);
        setTotalRows(res.data.total);
      })
      .catch((err) => console.log(err));
  };

  const removeEmployee = (_id) => {
    call(DELETE_METHOD, EMPLOYEE_API + `/${_id}`, null)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteEmployee(res.data));
          const employeeFilter = employees.filter((element) => {
            return element._id !== res.data._id;
          });
          dispatch(setEmployees(employeeFilter));
          setEmployeesData(employeeFilter);
        }
      })
      .catch((err) => alert('Delete employee fail' + err.message));
  };

  const createEmployee = () => {
    call(POST_METHOD, EMPLOYEE_API, employee)
      .then((res) => {
        if (res.status === 201) {
          dispatch(addEmployee(res.data));
          console.log(employees);
          setEmployeesData(employees);
          setEmployee(null);
          setOpenFormAddEmployee(false);
        }
      })
      .catch((err) => alert('Add employee fail' + err.message));
  };

  const handleUpdateEmployee = async () => {
    call(PUT_METHOD, EMPLOYEE_API + `/${employee._id}`, employee)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateEmployee(res.data));
          setEmployeesData(employees);
          setEmployee(null);
          setOpenFormAddEmployee(false);
        }
      })
      .catch((err) => alert('Update employee fail' + err.message));
    // const response = await axios
    //   .put(`http://localhost:2000/api/employee/${employee._id}`, employee)
    //   .catch((err) => console.log(err));
    // if (response.status === 200) {
    //   dispatch(updateEmployee(response.data));
    //   setEmployeesData(employees);
    //   setEmployee(null);
    //   setOpenFormAddEmployee(false);
    // }
  };

  const searchEmployees = () => {
    setLoading(true);
    call(GET_METHOD, EMPLOYEE_API + `/name/${searchEmployeesByName}`, null)
      .then((res) => {
        if (!searchEmployeesByName) setPagination(true);
        else setPagination(false);
        dispatch(setEmployees(res.data));
        setEmployeesData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log('Can not search employees' + err));
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Birthday',
      selector: (row) => moment(row.birthday).format('DD-MM-YYYY'),
    },
    {
      name: 'Sex',
      selector: (row) => row.sex,
      cell: (row) => <div>{row.sex}</div>,
    },
    {
      name: 'Phone',
      selector: (row) => row.phoneNumber,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Position',
      selector: (row) => row.position,
    },
    {
      name: 'Level',
      selector: (row) => row.level,
    },
    {
      name: 'Salary',
      selector: (row) => formatCurrency('vi-VN', 'currency', 'VND', row.salary),
    },
    {
      name: 'Action',
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
            onClick={() => removeEmployee(row._id)}
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
  const handlePageChange = (page) => {
    fetchEmployees(perPage, page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    fetchEmployees(newPerPage, page);
  };

  return (
    <div className="employee">
      <DataTable
        style={{ zIndex: 10 }}
        columns={columns}
        data={employeesData}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <div style={{ position: 'relative' }}>
            <input
              className="search-employee"
              type="text"
              placeholder="Search Employee"
              onChange={(e) =>
                setSearchEmployeesByName(e.target.value.toString())
              }
            />
            <button className="search-button" onClick={() => searchEmployees()}>
              <ImSearch></ImSearch>
            </button>
          </div>
        }
        subHeaderAlign="right"
        progressPending={loading}
        pagination={pagination}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      ></DataTable>
      <div
        className={
          openFormAddEmployee === true ? 'form-employee-open' : 'form-employee'
        }
      >
        <div className="button-open">
          <AiOutlineLeft
            style={{
              fontSize: 20,
              transform:
                openFormAddEmployee === true ? 'rotate(3.142rad)' : null,
              transition: '0.5s',
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
