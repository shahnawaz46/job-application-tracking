import * as Yup from "yup";
import {
  APPLICATION_STATUS,
  COMPANY_NAME_MAX,
  COMPANY_NAME_MIN,
  JOB_TITLE_MAX,
  JOB_TITLE_MIN,
  JOB_TYPE,
  LOCATION_MAX,
  LOCATION_MIN,
  SALARY_MAX,
  SALARY_MIN,
  SOURCE_MAX,
  SOURCE_MIN,
  WORK_MODE,
} from "./constants";
import {
  APPLICATION_STATUS_MESSAGES,
  APPLIED_DATE_MESSAGES,
  COMPANY_MESSAGES,
  JOB_TITLE_MESSAGES,
  JOB_TYPE_MESSAGES,
  LOCATION_MESSAGES,
  SALARY_MESSAGES,
  SOURCE_MESSAGES,
  WORK_MODE_MESSAGES,
} from "./messages";

export type TApplicationStatus = (typeof APPLICATION_STATUS)[number];
export type TJobType = (typeof JOB_TYPE)[number];
export type TWorkMode = (typeof WORK_MODE)[number];

export interface IJobApplication {
  company_name: string;
  job_title: string;
  applied_date: string;
  application_status: TApplicationStatus;
  job_location?: string;
  job_type?: TJobType | null;
  work_mode?: TWorkMode | null;
  application_source?: string;
  salary_range?: string;
}

export const jobApplicationInitialState: IJobApplication = {
  company_name: "",
  job_title: "",
  applied_date: "",
  application_status: "Applied",
  job_location: "",
  job_type: undefined,
  work_mode: undefined,
  application_source: "",
  salary_range: "",
};

export const jobApplicationSchema = Yup.object({
  company_name: Yup.string()
    .required(COMPANY_MESSAGES.REQUIRED)
    .min(COMPANY_NAME_MIN, COMPANY_MESSAGES.MIN)
    .max(COMPANY_NAME_MAX, COMPANY_MESSAGES.MAX),

  job_title: Yup.string()
    .required(JOB_TITLE_MESSAGES.REQUIRED)
    .min(JOB_TITLE_MIN, JOB_TITLE_MESSAGES.MIN)
    .max(JOB_TITLE_MAX, JOB_TITLE_MESSAGES.MAX),

  applied_date: Yup.string().required(APPLIED_DATE_MESSAGES.REQUIRED),

  application_status: Yup.mixed<TApplicationStatus>()
    .oneOf(APPLICATION_STATUS, APPLICATION_STATUS_MESSAGES.INVALID)
    .required(APPLICATION_STATUS_MESSAGES.REQUIRED),

  job_location: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .min(LOCATION_MIN, LOCATION_MESSAGES.MIN)
    .max(LOCATION_MAX, LOCATION_MESSAGES.MAX)
    .optional(),

  job_type: Yup.mixed<TJobType>()
    .oneOf(JOB_TYPE, JOB_TYPE_MESSAGES.INVALID)
    .optional(),

  work_mode: Yup.mixed<TWorkMode>()
    .oneOf(WORK_MODE, WORK_MODE_MESSAGES.INVALID)
    .optional(),

  application_source: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .min(SOURCE_MIN, SOURCE_MESSAGES.MIN)
    .max(SOURCE_MAX, SOURCE_MESSAGES.MAX)
    .optional(),

  salary_range: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .min(SALARY_MIN, SALARY_MESSAGES.MIN)
    .max(SALARY_MAX, SALARY_MESSAGES.MAX)
    .optional(),
});
