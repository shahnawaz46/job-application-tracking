import * as Yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./regex";

export interface IInitialState {
  email: string;
  password: string;
}

export const initialState: IInitialState = {
  email: "",
  password: "",
};

// SIGN UP
export const signUpSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Please provide a valid email address")
    .trim(),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password cannot be more than 128 characters")
    .matches(
      PASSWORD_REGEX,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

// SIGN IN
export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Please provide a valid email address")
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

// FORGOT PASSWORD
export interface IForgotPasswordState {
  email: string;
  otp: string;
}

export const forgotPasswordInitialState: IForgotPasswordState = {
  email: "",
  otp: "",
};

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Please provide a valid email address")
    .trim(),
  otp: Yup.string()
    .required("OTP is required")
    .min(6, "OTP must be 6 digit long")
    .max(6, "OTP must be 6 digit long"),
});

// Update Password/Reset New Password
export interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
}

export const updatePasswordInitialState: IUpdatePassword = {
  newPassword: "",
  confirmPassword: "",
};

export const updatePasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password cannot be more than 128 characters")
    .matches(
      PASSWORD_REGEX,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
});
