import { ActionTypes } from "../contants/action-types";
export const getEmployees = (employees) => {
  return {
    type: ActionTypes.GET_EMPLOYEES,
    payload: employees,
  };
};
export const addEmployee = (employee) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE,
    payload: employee,
  };
};
