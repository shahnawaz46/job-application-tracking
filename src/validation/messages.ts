import { NAME_MAX, NAME_MIN, PASSWORD_MAX, PASSWORD_MIN } from "./constants";

export const NAME_MESSAGES = {
  REQUIRED: "Please enter your full name",
  MIN: `Your name must contain at least ${NAME_MIN} character`,
  MAX: `Your name must be no longer than ${NAME_MAX} characters`,
};

export const EMAIL_MESSAGES = {
  REQUIRED: "Email is required",
  INVALID: "Please provide a valid email address",
} as const;

export const PASSWORD_MESSAGES = {
  REQUIRED: "Password is required",
  MIN: `Password must be at least ${PASSWORD_MIN} characters`,
  MAX: `Password cannot be more than ${PASSWORD_MAX} characters`,
  INVALID:
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
} as const;

export const OTP_MESSAGES = {
  REQUIRED: "OTP is required",
  INVALID: "OTP must be a valid 6-digit code",
} as const;

export const PHONE_MESSAGES = {
  REQUIRED: "Please enter your phone number.",
  INVALID: "Please enter a valid phone number (e.g., +1234567890).",
};

export const GENDER_MESSAGES = {
  INVALID: "Please select a valid gender option.",
};
