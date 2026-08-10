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

// types/interface
import type { TApplicationStatus, TJobType, TWorkMode } from "@/types/type";

export const jobApplicationSchema = Yup.object({
  company_name: Yup.string()
    .trim()
    .required(COMPANY_MESSAGES.REQUIRED)
    .min(COMPANY_NAME_MIN, COMPANY_MESSAGES.MIN)
    .max(COMPANY_NAME_MAX, COMPANY_MESSAGES.MAX),

  job_title: Yup.string()
    .trim()
    .required(JOB_TITLE_MESSAGES.REQUIRED)
    .min(JOB_TITLE_MIN, JOB_TITLE_MESSAGES.MIN)
    .max(JOB_TITLE_MAX, JOB_TITLE_MESSAGES.MAX),

  applied_date: Yup.string().trim().required(APPLIED_DATE_MESSAGES.REQUIRED),

  application_status: Yup.mixed<TApplicationStatus>()
    .required(APPLICATION_STATUS_MESSAGES.REQUIRED)
    .oneOf(APPLICATION_STATUS, APPLICATION_STATUS_MESSAGES.INVALID),

  job_location: Yup.string()
    .optional()
    .trim()
    .test(
      "location-min",
      LOCATION_MESSAGES.MIN,
      (value) => !value || value.length >= LOCATION_MIN,
    )
    .test(
      "location-max",
      LOCATION_MESSAGES.MAX,
      (value) => !value || value.length <= LOCATION_MAX,
    ),

  job_type: Yup.mixed<TJobType>()
    .required(JOB_TYPE_MESSAGES.REQUIRED)
    .oneOf(JOB_TYPE, JOB_TYPE_MESSAGES.INVALID),

  work_mode: Yup.mixed<TWorkMode>()
    .required(WORK_MODE_MESSAGES.REQUIRED)
    .oneOf(WORK_MODE, WORK_MODE_MESSAGES.INVALID),

  application_source: Yup.string()
    .optional()
    .trim()
    .test(
      "source-min",
      SOURCE_MESSAGES.MIN,
      (value) => !value || value.length >= SOURCE_MIN,
    )
    .test(
      "source-max",
      SOURCE_MESSAGES.MAX,
      (value) => !value || value.length <= SOURCE_MAX,
    ),

  salary_range: Yup.string()
    .optional()
    .trim()
    .test(
      "salary-min",
      SALARY_MESSAGES.MIN,
      (value) => !value || value.length >= SALARY_MIN,
    )
    .test(
      "salary-max",
      SALARY_MESSAGES.MAX,
      (value) => !value || value.length <= SALARY_MAX,
    ),
});
