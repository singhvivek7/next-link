"use server";

import { axiosInstance } from "@/lib/helper/request";
import { RegisterSchema } from "@/lib/helper/validation";

export const handleRegister = async (registerForm: RegisterSchema) => {
  try {
    const { data } = await axiosInstance.post("api/v1/register", registerForm);

    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
