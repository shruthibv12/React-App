export default (
  state = {
    dept:[],
    emp:[],
  },
  action
) => {
  switch (action.type) {
    case 'LOAD_DEPT':
      return {
          ...state,
          dept: action.deptload,
      }
    case 'LOAD_EMP':
      return {
          ...state,
          emp:action.empload,

      }  
    default:
      return state;
  }
};