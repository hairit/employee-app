import { Button, DatePicker, Form, Radio, Select, Input } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { useState, useEffect } from "react";

const dateFormat = "YYYY-MM-DD";

export default function AddEmployee({
  employee,
  setEmployee,
  createEmployee,
  handleUpdateEmployee,
  openFormAddEmployee,
}) {
  useEffect(() => {
    if (openFormAddEmployee === false) resetErrol();
  }, [openFormAddEmployee]);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [sexError, setSexError] = useState(false);
  const [levelError, setLevelError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);

  const resetErrol = () => {
    setNameError(false);
    setEmailError(false);
    setPhoneError(false);
    setBirthdayError(false);
    setSexError(false);
    setLevelError(false);
    setPositionError(false);
    setSalaryError(false);
  };

  const validate = () => {
    var validate = true;
    if (!employee.name) {
      setNameError(true);
      validate = false;
    } else {
      setNameError(false);
    }
    if (!employee.email || !employee.email.toString().includes("@")) {
      setEmailError(true);
      validate = false;
    } else {
      setEmailError(false);
    }
    if (!employee.phoneNumber || employee.phoneNumber.length !== 10) {
      setPhoneError(true);
      validate = false;
    } else {
      setPhoneError(false);
    }
    if (!employee.birthday) {
      setBirthdayError(true);
      validate = false;
    } else {
      setBirthdayError(false);
    }
    if (!employee.sex) {
      setSexError(true);
      validate = false;
    } else {
      setSexError(false);
    }
    if (!employee.level) {
      setLevelError(true);
      validate = false;
    } else {
      setLevelError(false);
    }
    if (!employee.salary) {
      setSalaryError(true);
      validate = false;
    } else {
      setSalaryError(false);
    }
    if (!employee.position) {
      setPositionError(true);
      validate = false;
    } else {
      setPositionError(false);
    }
    return validate;
  };
  const handleActionEmployee = () => {
    if (validate()) {
      if (employee._id) handleUpdateEmployee();
      else createEmployee();
    }
  };
  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "25px 0",
          fontSize: 30,
        }}
      >
        {employee ? (employee._id ? "Edit" : "Create") : "Create"} a new
        employee
      </div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item label="Name">
          <Input
            value={employee ? employee.name : ""}
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value.toString() })
            }
          />
          {employee ? (
            nameError ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                Please provider this information
              </div>
            ) : null
          ) : null}
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={employee ? employee.email : ""}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value.toString() })
            }
          />
          {employee ? (
            emailError ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                {" "}
                Please provide Employee email address and it must contain @
                character.
              </div>
            ) : null
          ) : null}
        </Form.Item>
        <Form.Item label="Phone">
          <Input
            value={employee ? employee.phoneNumber : ""}
            onChange={(e) =>
              setEmployee({
                ...employee,
                phoneNumber: e.target.value.toString(),
              })
            }
          />
          {employee ? (
            phoneError === true ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                {" "}
                Employee phone number length must be 10
              </div>
            ) : (
              <div></div>
            )
          ) : null}
        </Form.Item>
        <Form.Item label="Birthday">
          <DatePicker
            value={
              employee
                ? employee.birthday
                  ? moment(employee.birthday, dateFormat)
                  : ""
                : ""
            }
            onChange={(date, dateString) =>
              setEmployee({ ...employee, birthday: dateString })
            }
          />
          {employee ? (
            birthdayError ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                Please select employee' birthday
              </div>
            ) : null
          ) : null}
        </Form.Item>
        <Form.Item label="Sex">
          <Radio.Group
            value={employee ? employee.sex : null}
            onChange={(e) =>
              setEmployee({ ...employee, sex: e.target.value.toString() })
            }
          >
            <Radio value="Male">Male</Radio>
            <Radio value="Female"> Female</Radio>
          </Radio.Group>
          {employee ? (
            sexError ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                Please select employee' sex.
              </div>
            ) : null
          ) : null}
        </Form.Item>
        <Form.Item label="Level">
          <Select
            value={employee ? employee.level : ""}
            onChange={(value) => setEmployee({ ...employee, level: value })}
            defaultValue={employee ? employee.level : ""}
          >
            <Select.Option value="Intern">Intern</Select.Option>
            <Select.Option value="Junior">Junior</Select.Option>
            <Select.Option value="Middle">Middle</Select.Option>
            <Select.Option value="Senior">Senior</Select.Option>
            <Select.Option value="Team Lead">Team Lead</Select.Option>
          </Select>
          {employee ? (
            levelError ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                Please provider employee level
              </div>
            ) : null
          ) : null}
        </Form.Item>
        <Form.Item label="Position">
          <Select
            value={employee ? employee.position : ""}
            onChange={(value) => setEmployee({ ...employee, position: value })}
            defaultValue={employee ? employee.position : ""}
          >
            <Select.Option value="Front-end Developer">
              Front-end Developer
            </Select.Option>
            <Select.Option value="Back-end Developer">
              Back-end Developer
            </Select.Option>
            <Select.Option value="Software Engineer">
              Software Engineer
            </Select.Option>
            <Select.Option value="Business Analysis">
              Business Analysis
            </Select.Option>
          </Select>
          {employee ? (
            positionError ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                Please provider employee position
              </div>
            ) : null
          ) : null}
        </Form.Item>
        <Form.Item label="Salary">
          <Input
            value={employee ? employee.salary : ""}
            type={"number"}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value.toString() })
            }
          />
          {employee ? (
            salaryError ? (
              <div style={{ padding: "4px 11px", color: "red" }}>
                Please provider employee salary
              </div>
            ) : null
          ) : null}
        </Form.Item>
        {/* <Form.Item label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item> */}
        <Form.Item label="Action">
          <Button
            style={{ marginRight: 12 }}
            onClick={() => handleActionEmployee()}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setEmployee(null);
              resetErrol();
            }}
          >
            Clear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
