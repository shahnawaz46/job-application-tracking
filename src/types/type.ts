import {
  APPLICATION_STATUS,
  GENDER_OPTIONS,
  JOB_TYPE,
  WORK_MODE,
} from "@/validation/constants";

// types/interface
import type { IUserProfile } from "./interface";

export type TApplicationStatus = (typeof APPLICATION_STATUS)[number];
export type TJobType = (typeof JOB_TYPE)[number];
export type TWorkMode = (typeof WORK_MODE)[number];

// * convert strings with spaces into snake_case.
// Example: "In Review" -> "In_Review"
type ToSnakeCase<T> = T extends `${infer A} ${infer B}` ? `${A}_${B}` : T;

// * build the application stats object automatically
// TWorkMode keys (Remote, Hybrid, Onsite, etc.) -> number
// TApplicationStatus keys are converted to snake_case
export type TApplicationStats = { [J in TWorkMode]: number } & {
  [K in ToSnakeCase<TApplicationStatus>]: number;
};

export type TGender = (typeof GENDER_OPTIONS)[number];

export type IEditUserProfile = Pick<
  IUserProfile,
  "full_name" | "phone_no" | "gender"
>;
