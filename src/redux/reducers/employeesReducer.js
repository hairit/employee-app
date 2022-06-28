import { ActionTypes } from "../contants/action-types";

const initialState = {
  employees: [],
};

export const employeesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_EMPLOYEES:
      return { ...state, employees: payload };
    default:
      return state;
  }
};
