export const NAME_MIN = 2;
export const NAME_MAX = 100;

export const PASSWORD_MIN = 6;
export const PASSWORD_MAX = 128;

export const PHONE_NO_LENGTH = 10;

export const GENDER_OPTIONS = ["male", "female", "other"] as const;

// add job application
export const COMPANY_NAME_MIN = 2;
export const COMPANY_NAME_MAX = 100;

export const JOB_TITLE_MIN = 2;
export const JOB_TITLE_MAX = 100;

export const LOCATION_MIN = 2;
export const LOCATION_MAX = 200;

export const SOURCE_MIN = 2;
export const SOURCE_MAX = 50;

export const SALARY_MIN = 2;
export const SALARY_MAX = 50;

export const APPLICATION_STATUS = [
  "Applied",
  "Shortlisted",
  "Not Shortlisted",
  "HR Interview / PI",
  "Interview",
  "Rejected",
  "Offer Received",
  "Withdrawn",
] as const;

export const JOB_TYPE = ["Full-time", "Internship", "Contract"] as const;

export const WORK_MODE = ["Remote", "Hybrid", "Onsite"] as const;
