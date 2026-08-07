// types/interface
import type { TApplicationStatus, TGender, TJobType, TWorkMode } from "./type";

// * applications
export interface IMonthlyApplicationStats {
  month_number: number;
  month_name: string;
  total: number;
}

export interface IJobApplication {
  company_name: string;
  job_title: string;
  applied_date: string;
  application_status: TApplicationStatus;
  job_location?: string;
  job_type: TJobType;
  work_mode: TWorkMode;
  application_source?: string;
  salary_range?: string;
}

export interface IJobApplicationRes extends IJobApplication {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  search_text: string;
}

export interface IParams extends Record<string, string> {
  status: TApplicationStatus;
}

// * user
export interface IUserProfile {
  id: string;
  full_name: string;
  email: string;
  phone_no: string;
  gender: TGender;
  profile_pic: string | null;
  created_at: string;
}

// * auth
export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface IForgotPasswordState {
  email: string;
  otp: string;
}

export interface IVerifyOTP {
  otp: string;
  email: string;
  type: "email" | "recovery";
}

export interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
}
