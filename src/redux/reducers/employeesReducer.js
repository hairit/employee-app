import { ActionTypes } from "../contants/action-types";

const initialState = {
  employees: [],
};

export const employeesReducer = (state = initialState, { type, payload }) => {
  var employees;
  switch (type) {
    case ActionTypes.GET_EMPLOYEES:
      return { ...state, employees: payload };
    case ActionTypes.ADD_EMPLOYEE: {
      employees = state.employees;
      employees.push(payload);
      return { ...state, employees: employees };
    }
    case ActionTypes.UPDATE_EMPLOYEE: {
      employees = state.employees;
      const id = employees.findIndex((e) => e._id === payload._id);
      console.log(employees[id]);
      employees[id] = payload;
      console.log(employees[id]);
      return { ...state, employees: employees };
    }
    case ActionTypes.DELETE_EMPLOYEE: {
      employees = state.employees;
      employees.filter((element) => element._id !== payload._id);
      return { ...state, employees: employees };
    }
    default:
      return state;
  }
};
