import * as Yup from "yup";
import { NAME_MAX, NAME_MIN, PASSWORD_MAX, PASSWORD_MIN } from "./constants";
import {
  EMAIL_MESSAGES,
  NAME_MESSAGES,
  OTP_MESSAGES,
  PASSWORD_MESSAGES,
} from "./messages";
import { EMAIL_REGEX, OTP_REGEX, PASSWORD_REGEX } from "./regex";

export const signUpSchema = Yup.object({
  full_name: Yup.string()
    .required(NAME_MESSAGES.REQUIRED)
    .min(NAME_MIN, NAME_MESSAGES.MIN)
    .max(NAME_MAX, NAME_MESSAGES.MAX)
    .trim(),

  email: Yup.string()
    .required(EMAIL_MESSAGES.REQUIRED)
    .matches(EMAIL_REGEX, EMAIL_MESSAGES.INVALID)
    .trim(),

  password: Yup.string()
    .required(PASSWORD_MESSAGES.REQUIRED)
    .min(PASSWORD_MIN, PASSWORD_MESSAGES.MIN)
    .max(PASSWORD_MAX, PASSWORD_MESSAGES.MAX)
    .matches(PASSWORD_REGEX, PASSWORD_MESSAGES.INVALID),

  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required(EMAIL_MESSAGES.REQUIRED)
    .matches(EMAIL_REGEX, EMAIL_MESSAGES.INVALID)
    .trim(),

  password: Yup.string()
    .required(PASSWORD_MESSAGES.REQUIRED)
    .max(PASSWORD_MAX, PASSWORD_MESSAGES.MAX),
});

// VERIFY EMAIL/ACCOUNT
export const otpSchema = Yup.object({
  otp: Yup.string()
    .required(OTP_MESSAGES.REQUIRED)
    .matches(OTP_REGEX, OTP_MESSAGES.INVALID),
});

// FORGOT PASSWORD
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
export const updatePasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required(PASSWORD_MESSAGES.REQUIRED)
    .min(PASSWORD_MIN, PASSWORD_MESSAGES.MIN)
    .max(PASSWORD_MAX, PASSWORD_MESSAGES.MAX)
    .matches(PASSWORD_REGEX, PASSWORD_MESSAGES.INVALID),

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
});
