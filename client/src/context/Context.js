import React, { useReducer } from "react";
import axios from "axios";
import employeeReducer from "./reducer";
import { API_END_POINT } from "../util/constants";

const initialState = {
  loading: false,
  employees: [],
};

const handleFailedState = (error, dispatch) => {
  //TODO wii show generic error
};

const saveEmployee = (dispatch) => {
  return async ({ name, email, dob, address, age, photo }) => {
    dispatch({
      type: "LOADING",
      payload: { loading: true },
    });
    const url = `${API_END_POINT}/employee`;
    return axios
      .post(url, { name, email, dob, address, age, photo })
      .then(async (response) => {
        dispatch({
          type: "LOADING",
          payload: { loading: false },
        });
        const { data = {} } = response;
        const { user = {} } = data;
        dispatch({
          type: "USER_ADDED",
          payload: { user },
        });
        return { user };
      })
      .catch(function (err) {
        const { response = {} } = err;
        const { data = {} } = response;
        const { error } = data;
        return { error };
      });
  };
};

const updateEmployee = (dispatch) => {
  return async ({ id, name, email, dob, address, age, photo }) => {
    dispatch({
      type: "LOADING",
      payload: { loading: true },
    });
    const url = `${API_END_POINT}/employee`;
    return axios
      .patch(url, { id, name, email, dob, address, age, photo })
      .then(async (response) => {
        dispatch({
          type: "LOADING",
          payload: { loading: false },
        });
        const { data = {} } = response;
        const { user = {} } = data;
        dispatch({
          type: "USER_UPDATED",
          payload: { user },
        });
        return { user };
      })
      .catch(function (err) {
        const { response = {} } = err;
        const { data = {} } = response;
        const { error } = data;
        return { error };
      });
  };
};

const getAllEmployee = (dispatch) => {
  return async () => {
    dispatch({
      type: "LOADING",
      payload: { loading: true },
    });
    const url = `${API_END_POINT}/employee`;
    return axios
      .get(url)
      .then(async (response) => {
        dispatch({
          type: "LOADING",
          payload: { loading: false },
        });
        const { data = {} } = response;
        const { users = [] } = data;
        dispatch({
          type: "GET_USER",
          payload: { users },
        });
      })
      .catch(function (error) {
        return handleFailedState(error, dispatch);
      });
  };
};

const deleteEmployee = (dispatch) => {
  return async (id) => {
    dispatch({
      type: "LOADING",
      payload: { loading: true },
    });
    const url = `${API_END_POINT}/employee`;
    return axios
      .delete(`${url}/${id}`)
      .then(async (response) => {
        dispatch({
          type: "LOADING",
          payload: { loading: false },
        });
        dispatch({
          type: "USER_DELETED",
          payload: null,
        });
        const { data = {} } = response;
        const { msg } = data;
        return msg;
      })
      .catch(function (error) {
        return handleFailedState(error, dispatch);
      });
  };
};

const createContext = (reducer, functions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions  === { functionName: (dispatch) => { return () => {} } }
    const boundActions = {};
    for (let fn in functions) {
      boundActions[fn] = functions[fn](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};

const { Context, Provider } = createContext(
  employeeReducer,
  {
    saveEmployee,
    getAllEmployee,
    updateEmployee,
    deleteEmployee,
  },
  initialState
);

export { Context, Provider };
