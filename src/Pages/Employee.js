import React from 'react';
import { useState, useEffect } from 'react';
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
import { confirmAlert } from 'react-confirm-alert';
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
const PATCH_METHOD = 'PATCH';
const EMPLOYEE_API = 'api/employee';

export default function Employee() {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openFormAddEmployee, setOpenFormAddEmployee] = useState(false);
  const [searchEmployeesByName, setSearchEmployeesByName] = useState('');
  const [employee, setEmployee] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);
  const [reload, setReload] = useState(true);

  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchEmployees(perPage, page);
  // }, []);

  // const fetchEmployees = () => {
  //   call(GET_METHOD, EMPLOYEE_API, null)
  //     .then((res) => {
  //       dispatch(setEmployees(res.data));
  //       employees && setEmployeesData(employees);
  //     })
  //     .catch((err) => console.log('Cannot get employees' + err));
  // };
  const fetchEmployees = (perPage, page) => {
    setLoading(true);
    var paging = '';
    page && perPage
      ? (paging = `/page/${page}/amount/${perPage}`)
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

  const deleteHandleClick = (_id) => {
    const options = {
      title: 'Notification',
      message: 'Do you want to delete this employee',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeEmployee(_id),
        },
        {
          label: 'No',
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
      overlayClassName: 'overlay-custom-class-name',
    };
    confirmAlert(options);
  };

  const removeEmployee = (_id) => {
    call(DELETE_METHOD, EMPLOYEE_API + `/${_id}`, null)
      .then((res) => {
        if (res.status === 200) {
          //console.log(res.data);
          console.log(res.data);
          dispatch(deleteEmployee(res.data));

          const employeeFilter = employees.filter((element) => {
            return element._id !== res.data._id;
          });

          dispatch(setEmployees(employeeFilter));
          setEmployeesData(employeeFilter);
          //fetchEmployees(perPage, page)
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
    if (!searchEmployeesByName) {
      fetchEmployees();
    } else {
      call(GET_METHOD, EMPLOYEE_API + `/name/${searchEmployeesByName}`, null)
        .then((res) => dispatch(setEmployees(res.data)))
        .catch((err) => console.log('Can not search employees' + err));
    }
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
    setPage(page);
    fetchEmployees(perPage, page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    fetchEmployees(newPerPage, page);
  };

  return (
    <div className="employee">
      {/* <div>{employees?.length}</div> */}
      {/* {console.log(employeesData)}
      // <div>{employeesData && employeesData[9]?.sex}</div> */}
      {console.log({ employeesData: employeesData })}
      <DataTable
        style={{ zIndex: 10 }}
        columns={columns}
        data={employeesData}
        fixedHeader
        fixedHeaderScrollHeight="800px"
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
        pagination
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
              //setEmployee(null);
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
