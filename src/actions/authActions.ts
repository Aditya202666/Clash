"use server";

import { CHECK_CREDENTIALS_ENDPOINT, FORGOT_PASSWORD_ENDPOINT, REGISTER_ENDPOINT, RESET_PASSWORD_ENDPOINT } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

export const registerAction = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };
  try {
    const { data } = await axios.post(REGISTER_ENDPOINT, rawFormData);

    if (data.success === true) {
    // console.log(data)
      return {
        status: data.statusCode,
        success: data.success,
        message: data.message,
        errors: {},
        input: rawFormData,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
    //   console.log(error.response?.data);
      if (error.response?.data.statusCode === 422) {
        return {
          status: 422,
          message: error.response?.data.message,
          input: rawFormData,
          errors: error.response?.data.data?.fieldErrors,
        };
      }
    }
  }

  return {
    status: 500,
    message: "Something went wrong",
    input: rawFormData,
    errors: {},
  };
};
export const loginAction = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    const { data } = await axios.post(CHECK_CREDENTIALS_ENDPOINT, rawFormData);

    console.log( "from auth actions", data, "from auth actions");
    if (data.success === true) {
      return {
        status: data.statusCode,
        success: data.success,
        message: data.message,
        errors: {},
        input: rawFormData,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.statusCode !== 500) {
        // console.log(error.response?.data);
        return {
          status: error.response?.data.statusCode,
          message: error.response?.data.message,
          input: rawFormData,
          errors: error.response?.data.data?.fieldErrors,
        };
      }
    }
  }

  return {
    status: 500,
    message: "Something went wrong",
    input: rawFormData,
    errors: {},
  };
};

export const forgotPasswordAction = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    email: formData.get("email") as string,
  };
  try {
    const { data } = await axios.post(FORGOT_PASSWORD_ENDPOINT, rawFormData);

    console.log(data, "from auth actions");
    if (data.success === true) {
      return {
        status: data.statusCode,
        success: data.success,
        message: data.message,
        errors: {},
        input: rawFormData,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.statusCode !== 500) {
        // console.log(error.response?.data);
        return {
          status: error.response?.data.statusCode,
          message: error.response?.data.message,
          input: rawFormData,
          errors: error.response?.data.data?.fieldErrors,
        };
      }
    }
  }

  return {
    status: 500,
    message: "Something went wrong",
    input: rawFormData,
    errors: {},
  };
};

export const resetPasswordAction = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    token: formData.get("token") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };
  try {
    const { data } = await axios.post(RESET_PASSWORD_ENDPOINT, rawFormData);

    if (data.success === true) {
    // console.log(data)
      return {
        status: data.statusCode,
        success: data.success,
        message: data.message,
        errors: {},
        input: rawFormData,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      if (error.response?.data.statusCode !== 500) {
        return {
          status: 422,
          message: error.response?.data.message,
          input: rawFormData,
          errors: error.response?.data.data?.fieldErrors,
        };
      }
    }
  }

  return {
    status: 500,
    message: "Something went wrong",
    input: rawFormData,
    errors: {},
  };
};

