import {
  COMPANY_NAME_MAX,
  COMPANY_NAME_MIN,
  JOB_TITLE_MAX,
  JOB_TITLE_MIN,
  LOCATION_MAX,
  LOCATION_MIN,
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
  SALARY_MAX,
  SALARY_MIN,
  SOURCE_MAX,
  SOURCE_MIN,
} from "./constants";

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
} as const;

export const GENDER_MESSAGES = {
  INVALID: "Please select a valid gender option.",
} as const;

// add job application messaegs
export const COMPANY_MESSAGES = {
  REQUIRED: "Company name is required",
  MIN: `Company name must be at least ${COMPANY_NAME_MIN} characters`,
  MAX: `Company name cannot exceed ${COMPANY_NAME_MAX} characters`,
} as const;

export const JOB_TITLE_MESSAGES = {
  REQUIRED: "Job title is required",
  MIN: `Job title must be at least ${JOB_TITLE_MIN} characters`,
  MAX: `Job title cannot exceed ${JOB_TITLE_MAX} characters`,
} as const;

export const APPLIED_DATE_MESSAGES = {
  REQUIRED: "Applied date is required",
  INVALID: "Please select a valid date",
} as const;

export const APPLICATION_STATUS_MESSAGES = {
  REQUIRED: "Application status is required",
  INVALID: "Please select a valid application status",
} as const;

export const LOCATION_MESSAGES = {
  REQUIRED: "Job location is required",
  MIN: `Job location must be at least ${LOCATION_MIN} characters`,
  MAX: `Job location cannot exceed ${LOCATION_MAX} characters`,
} as const;

export const JOB_TYPE_MESSAGES = {
  REQUIRED: "Job type is required",
  INVALID: "Please select a valid job type",
} as const;

export const WORK_MODE_MESSAGES = {
  REQUIRED: "Work mode is required",
  INVALID: "Please select a valid work mode",
} as const;

export const SOURCE_MESSAGES = {
  REQUIRED: "Application source is required",
  MIN: `Application source must be at least ${SOURCE_MIN} characters`,
  MAX: `Application source cannot exceed ${SOURCE_MAX} characters`,
} as const;

export const SALARY_MESSAGES = {
  REQUIRED: "Salary range is required",
  MIN: `Salary range must be at least ${SALARY_MIN} characters`,
  MAX: `Salary range cannot exceed ${SALARY_MAX} characters`,
} as const;
