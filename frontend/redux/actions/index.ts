import { FAIL_REQUEST, LOGIN, MAKE_REQUEST } from "./types";

export const makeRequestAction = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const failRequestAction = (error: any) => {
  return {
    type: FAIL_REQUEST,
    payload: error,
  };
};

export const loginAction = (user: any) => ({
  type: LOGIN,
  payload: user,
});
