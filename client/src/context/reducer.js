const employeeReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };
    case "USER_ADDED":
    case "USER_UPDATED":
      return {
        ...state,
        currentUser: action.payload.user,
        employees: [],
      };
    case "GET_USER":
      return {
        ...state,
        employees: action.payload.users,
      };
    case "USER_DELETED":
      return {
        ...state,
        employees: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default employeeReducer;
