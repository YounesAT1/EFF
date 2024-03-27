import { FAIL_REQUEST, LOGIN, MAKE_REQUEST } from "../actions/types";

export type authState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: any;
};

const initialState: authState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
};

export type authAction =
  | { type: "MAKE_REQUEST" }
  | { type: "FAIL_REQUEST"; payload: any }
  | { type: "LOGIN"; payload: any };

export const authReducer = (state = initialState, action: authAction) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case FAIL_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
