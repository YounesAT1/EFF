import { axiosClient } from "@/api/axios";
import { failRequestAction, loginAction, makeRequestAction } from ".";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

type credentialsType = {
  email: string;
  password: string;
};

const csrf = () => axiosClient.get("/sanctum/csrf-cookie");

export const login = (credentials: credentialsType) => {
  return async (dispatch: any) => {
    dispatch(makeRequestAction());
    try {
      await csrf();
      const res: AxiosResponse = await axiosClient.post("/login", credentials);

      if (res.status === 204) {
        dispatch(loginAction(res.data));
        toast.success("Sign in successfully");
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(failRequestAction(error.response.data.errors.email));
      } else {
        dispatch(failRequestAction("Something went wrong"));
      }
    }
  };
};
