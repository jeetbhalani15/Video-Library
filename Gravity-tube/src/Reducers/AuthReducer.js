export const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "CHECK_TOKEN":
      return { ...state, token: payload };
    case "SIGN_UP":
      return { ...state, token: payload };
    case "LOG_IN":
      return { ...state, token: payload };
      case "LOG_OUT":
      return { ...authState, token : null }
    default:
      return state;
  }
};
