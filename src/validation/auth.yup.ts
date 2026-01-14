import * as Yup from "yup";
import {
  EMAIL_MESSAGES,
  FULL_NAME_MESSAGES,
  OTP_MESSAGES,
  PASSWORD_MESSAGES,
} from "./messages";
import { EMAIL_REGEX, OTP_REGEX, PASSWORD_REGEX } from "./regex";

// SIGN UP
export interface ISignUp {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const signUpInitialState: ISignUp = {
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

export const signUpSchema = Yup.object({
  full_name: Yup.string().required(FULL_NAME_MESSAGES.REQUIRED),
  email: Yup.string()
    .required(EMAIL_MESSAGES.REQUIRED)
    .matches(EMAIL_REGEX, EMAIL_MESSAGES.INVALID)
    .trim(),

  password: Yup.string()
    .required(PASSWORD_MESSAGES.REQUIRED)
    .min(6, PASSWORD_MESSAGES.MIN)
    .max(128, PASSWORD_MESSAGES.MAX)
    .matches(PASSWORD_REGEX, PASSWORD_MESSAGES.INVALID),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

// SIGN IN
export interface ISignIn {
  email: string;
  password: string;
}

export const signInInitialState: ISignIn = {
  email: "",
  password: "",
};

export const signInSchema = Yup.object({
  email: Yup.string()
    .required(EMAIL_MESSAGES.REQUIRED)
    .matches(EMAIL_REGEX, EMAIL_MESSAGES.INVALID)
    .trim(),

  password: Yup.string()
    .required(PASSWORD_MESSAGES.REQUIRED)
    .max(128, PASSWORD_MESSAGES.MAX),
});

// VERIFY EMAIL/ACCOUNT
export const otpSchema = Yup.object({
  otp: Yup.string()
    .required(OTP_MESSAGES.REQUIRED)
    .matches(OTP_REGEX, OTP_MESSAGES.INVALID),
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
    .required(EMAIL_MESSAGES.REQUIRED)
    .matches(EMAIL_REGEX, EMAIL_MESSAGES.INVALID)
    .trim(),
  otp: Yup.string()
    .required(OTP_MESSAGES.REQUIRED)
    .matches(OTP_REGEX, OTP_MESSAGES.INVALID),
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
    .required(PASSWORD_MESSAGES.REQUIRED)
    .min(6, PASSWORD_MESSAGES.MIN)
    .max(128, PASSWORD_MESSAGES.MAX)
    .matches(PASSWORD_REGEX, PASSWORD_MESSAGES.INVALID),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
});
