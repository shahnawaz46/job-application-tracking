export const EMAIL_MESSAGES = {
  REQUIRED: "Email is required",
  INVALID: "Please provide a valid email address",
} as const;

export const PASSWORD_MESSAGES = {
  REQUIRED: "Password is required",
  MIN: "Password must be at least 6 characters",
  MAX: "Password cannot be more than 128 characters",
  INVALID:
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
} as const;

export const OTP_MESSAGES = {
  REQUIRED: "OTP is required",
  INVALID: "OTP must be a valid 6-digit code",
} as const;
