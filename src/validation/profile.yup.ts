import * as Yup from "yup";
import { GENDER_OPTIONS, NAME_MAX, NAME_MIN } from "./constants";
import { GENDER_MESSAGES, NAME_MESSAGES, PHONE_MESSAGES } from "./messages";
import { PHONE_REGEX } from "./regex";

export type TGender = (typeof GENDER_OPTIONS)[number];

export interface IInitialState {
  full_name: string;
  phone_no: string;
  gender: TGender;
}

export const profileSchema = Yup.object({
  full_name: Yup.string()
    .required(NAME_MESSAGES.REQUIRED)
    .min(NAME_MIN, NAME_MESSAGES.MIN)
    .max(NAME_MAX, NAME_MESSAGES.MAX)
    .trim(),
  phone_no: Yup.string()
    .required(PHONE_MESSAGES.REQUIRED)
    .matches(PHONE_REGEX, PHONE_MESSAGES.INVALID)
    .trim(),
  gender: Yup.mixed<TGender>()
    .required()
    .oneOf(GENDER_OPTIONS, GENDER_MESSAGES.INVALID),
});
