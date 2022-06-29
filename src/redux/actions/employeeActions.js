import { ActionTypes } from "../contants/action-types";
export const setEmployees = (employees) => {
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

export const updateEmployee = (employee) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE,
    payload: employee,
  };
};

export const deleteEmployee = (employee) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE,
    payload: employee,
  };
};
