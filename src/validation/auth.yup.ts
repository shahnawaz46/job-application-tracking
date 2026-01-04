import * as Yup from "yup";

export interface IInitialState {
  email: string;
  password: string;
}

export const initialState: IInitialState = {
  email: "",
  password: "",
};

export const signUpSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please provide a valid email address")
    .trim(),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password cannot be more than 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please provide a valid email address")
    .trim(),

  password: Yup.string()
    .required("Password is required")
    .max(128, "Password cannot be more than 128 characters"),
});

export const otpSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .min(6, "OTP must be 6 digit long")
    .max(6, "OTP must be 6 digit long"),
});
